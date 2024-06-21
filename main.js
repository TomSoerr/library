const { app, BrowserWindow } = require('electron');
const createWindow = require('./createWindow');
const { syncDatabase } = require('./js/database');
const { setupIpcHandlers } = require('./js/ipcHandlers');
const path = require('path');

if (process.env.NODE_ENV === 'development') {
  const electronReload = require('electron-reload');

  electronReload(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
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

app.on('ready', async () => {
  await syncDatabase();
  createWindow();
  setupIpcHandlers();
});
