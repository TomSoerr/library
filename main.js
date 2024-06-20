const { app, Menu, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

if (process.env.NODE_ENV === 'development') {
  const electronReload = require('electron-reload');

  electronReload(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

const { Sequelize, DataTypes } = require('sequelize');

// _______________________
// Search project for production comments and remove the following lines

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 572,
    minWidth: 540,
    minHeight: 600,
    icon: path.join(__dirname, 'assets/icon.icns'),
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      disableBlinkFeatures: 'Eval',
      webviewTag: false,
      devTools: process.env.NODE_ENV === 'development',
    },
  });

  win.loadFile(path.join(__dirname, 'dist/index.html'));

  win.webContents.setVisualZoomLevelLimits(1, 1);

  // Remove before production
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [{ role: 'quit' }],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'resetZoom' },
        { role: 'togglefullscreen' },
        { role: 'toggleDevTools' },
      ],
    },
    {
      label: 'Window',
      submenu: [{ role: 'minimize' }],
    },
  ]);

  Menu.setApplicationMenu(menu);
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// _______________________

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(app.getPath('userData'), 'library.sqlite'),
});

// Define a model
const Library = sequelize.define('Library', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bewertung: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gelesen: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  beendet_am: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ist_reihe: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  band: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  favorit: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  anmerkung: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  leseexemplar: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  verliehen: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  verliehen_an: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verlag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

app.on('ready', async () => {
  await sequelize.sync(); // Sync database
  createWindow();
});

// Handle IPC requests
ipcMain.handle('fetch-data', async (event, id) => {
  const data = await Library.findOne({ where: { id } });
  return data ? data.dataValues : null;
});

ipcMain.handle('fetch-all-data', async (event, filter, order) => {
  const filterData = (data) => {
    if (!data) return [];
    const dataValues = data.map((item) => item.dataValues);
    return dataValues;
  };

  let data;

  const sortData = (arr) => {
    switch (order) {
      case 'tit':
        arr.sort((a, b) => a.titel.localeCompare(b.titel));
        break;
      case 'gen':
        arr.sort((a, b) => a.genre.localeCompare(b.genre));
        break;
      case 'spi-d':
        arr.sort((a, b) => b.spice - a.spice);
        break;
      case 'spi-i':
        arr.sort((a, b) => a.spice - b.spice);
        break;
      case 'bew-d':
        arr.sort((a, b) => b.bewertung - a.bewertung);
        break;
      case 'bew-i':
        arr.sort((a, b) => a.bewertung - b.bewertung);
        break;
      default:
        arr.sort((a, b) => {
          const aLastName = a.autor.split(' ').pop();
          const bLastName = b.autor.split(' ').pop();

          return aLastName.localeCompare(bLastName);
        });
    }
    return arr;
  };

  if (filter === 'gel') {
    data = await Library.findAll({ where: { gelesen: true } });
  } else if (filter === 'ung') {
    data = await Library.findAll({ where: { gelesen: false } });
  } else if (filter === 'fav') {
    data = await Library.findAll({ where: { favorit: true } });
  } else if (filter === 'exp') {
    data = await Library.findAll({ where: { leseexemplar: true } });
  } else if (filter === 'ver') {
    data = await Library.findAll({ where: { verliehen: true } });
  } else {
    data = await Library.findAll();
  }

  return sortData(filterData(data));
});

ipcMain.handle('save-data', async (event, id, value) => {
  // clean up the data
  const cleanData = Object.entries(value).reduce((acc, [key, value]) => {
    switch (key) {
      case 'gelesen':
      case 'ist_reihe':
      case 'favorit':
      case 'leseexemplar':
      case 'verliehen':
        acc[key] = Boolean(value);
        break;
      case 'spice':
      case 'bewertung':
        acc[key] = Number(value);
        break;
      case 'band':
        acc[key] = value ? Number(value) : null;
        break;
      default:
        acc[key] = value;
    }

    return acc;
  }, {});

  if (id !== undefined) {
    const idNumber = Number(id);
    // Update the existing entry with the id
    await Library.update(cleanData, {
      where: { id: idNumber },
    });
  } else {
    // Create a new entry
    await Library.create(cleanData);
  }
});

ipcMain.handle('delete-data', async (event, id) => {
  const idNumber = Number(id);
  const { response } = await dialog.showMessageBox({
    message: 'Möchtest du diesen Eintrag wirklich löschen?',
    type: 'warning',
    buttons: ['Ja', 'Nein'],
  });
  if (response === 0) {
    console.log('Deleting data');
    await Library.destroy({ where: { id: idNumber } });
  }
});

ipcMain.handle('import-database', async (event) => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'JSON', extensions: ['json'] }],
  });

  return new Promise((resolve, reject) => {
    if (filePaths.length > 0) {
      fs.readFile(filePaths[0], 'utf8', (readingError, jsonString) => {
        if (readingError) {
          dialog.showErrorBox(
            'Error reading file from disk',
            readingError.toString(),
          );
          reject();
        }
        try {
          const data = JSON.parse(jsonString);

          const dataWithoutId = data.map((item) => {
            const { id, ...rest } = item;
            return rest;
          });

          // Use Sequelize's bulkCreate method to insert the sample data
          Library.sync().then(() => {
            Library.bulkCreate(dataWithoutId)
              .then(() => {
                dialog.showMessageBox({
                  message: 'Data imported successfully',
                  type: 'info',
                });
                resolve();
              })
              .catch((importingError) => {
                dialog.showErrorBox(
                  'Error importing data',
                  importingError.toString(),
                );
              });
          });
        } catch (parsingError) {
          dialog.showErrorBox(
            'Error parsing JSON string',
            parsingError.toString(),
          );
        }
      });
    }
  });
});

ipcMain.handle('export-database', async (event) => {
  const { filePath } = await dialog.showSaveDialog({
    filters: [{ name: 'JSON', extensions: ['json'] }],
  });

  if (filePath) {
    Library.findAll().then((data) => {
      const dataWithoutId = data.map((item) => {
        const { id, ...rest } = item.dataValues;
        return rest;
      });

      fs.writeFile(filePath, JSON.stringify(dataWithoutId), (writingError) => {
        if (writingError) {
          dialog.showErrorBox(
            'Error writing file to disk',
            writingError.toString(),
          );
        } else {
          dialog.showMessageBox({
            message: 'Data exported successfully',
            type: 'info',
          });
        }
      });
    });
  }
});

ipcMain.handle('delete-database', async (event) => {
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    buttons: ['Ja', 'Nein'],
    message: 'Möchtest du wirklich alle Daten in der Datenbank löschen?',
  });

  if (response === 0) {
    await Library.sync({ force: true });
    dialog.showMessageBox({
      message: 'Database deleted successfully',
      type: 'info',
    });
    return Promise.resolve();
  }
});
