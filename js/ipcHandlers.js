const { ipcMain, dialog } = require('electron');
const { Library, Op } = require('./database');
const fs = require('fs');

const setupIpcHandlers = () => {
  // Fetch data from id
  ipcMain.handle('fetch-data', async (event, id) => {
    const data = await Library.findOne({ where: { id } });
    return data ? data.dataValues : null;
  });

  // Fetch all data from the database
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
        case 'spi-desc':
          arr.sort((a, b) => b.spice - a.spice);
          break;
        case 'spi-asc':
          arr.sort((a, b) => a.spice - b.spice);
          break;
        case 'bew-desc':
          arr.sort((a, b) => b.bewertung - a.bewertung);
          break;
        case 'bew-asc':
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
    if (filter === 'def') {
      data = await Library.findAll();
    } else if (filter === 'gel') {
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
      data = await Library.findAll({
        where: {
          [Op.or]: [
            { autor: { [Op.like]: `%${filter.toLowerCase()}%` } },
            { titel: { [Op.like]: `%${filter.toLowerCase()}%` } },
            { genre: { [Op.like]: `%${filter.toLowerCase()}%` } },
            { anmerkung: { [Op.like]: `%${filter.toLowerCase()}%` } },
            { verliehen_an: { [Op.like]: `%${filter.toLowerCase()}%` } },
            { isbn: { [Op.like]: `%${filter.toLowerCase()}%` } },
          ],
        },
      });
    }

    return sortData(filterData(data));
  });

  // Save data to the database
  ipcMain.handle('save-data', async (event, id, data) => {
    // clean up the data
    const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
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

    // Remove data when linked checkbox is unchecked
    if (!cleanData.ist_reihe) {
      cleanData.band = null;
    }

    if (!cleanData.gelesen) {
      cleanData.beendet_am = null;
    }

    if (!cleanData.verliehen) {
      cleanData.verliehen_an = null;
    }

    // Update or create the entry
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

  // Delete data from the database by id
  ipcMain.handle('delete-data', async (event, id) => {
    const idNumber = Number(id);
    const { response } = await dialog.showMessageBox({
      message: 'Möchtest du diesen Eintrag wirklich löschen?',
      type: 'warning',
      buttons: ['Ja', 'Nein'],
    });
    if (response === 0) {
      await Library.destroy({ where: { id: idNumber } });
      return true;
    }
    return false;
  });

  // Import data from a JSON file
  ipcMain.handle('import-database', async () => {
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

  // Export data to a JSON file
  ipcMain.handle('export-database', async () => {
    const { filePath } = await dialog.showSaveDialog({
      filters: [{ name: 'JSON', extensions: ['json'] }],
    });

    if (filePath) {
      Library.findAll().then((data) => {
        const dataWithoutId = data.map((item) => {
          const { id, ...rest } = item.dataValues;
          return rest;
        });

        fs.writeFile(
          filePath,
          JSON.stringify(dataWithoutId),
          (writingError) => {
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
          },
        );
      });
    }
  });

  // Delete all data from the database
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
};

module.exports = { setupIpcHandlers };
