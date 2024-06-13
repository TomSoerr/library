const { app, Menu, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const electronReload = require('electron-reload');
const { Sequelize, DataTypes } = require('sequelize');
const remote = require('@electron/remote/main');

// _______________________

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
      // Add before production
      // devTools: false,
    },
  });
  win.loadFile('dist/index.html');
  win.webContents.setVisualZoomLevelLimits(1, 1);

  // Remove before production
  win.webContents.openDevTools();

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
        // Remove before production
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

remote.initialize();

electronReload(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
});

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
    type: DataTypes.DATE,
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
ipcMain.handle('fetch-data', async (event, key) => {
  const data = await Library.findOne({ where: { key } });
  return data ? data.value : null;
});

ipcMain.handle('fetch-all-data', async () => {
  const data = await Library.findAll();
  return data;
});

ipcMain.handle('save-data', async (event, key, value) => {
  const [data, created] = await Library.findOrCreate({
    where: { key },
    defaults: { value },
  });
  if (!created) {
    data.value = value;
    await data.save();
  }
  return data;
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
