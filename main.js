const { app, BrowserWindow } = require('electron');
const path = require('path');
const electronReload = require('electron-reload');

electronReload(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 500,
    minHeight: 400,
    icon: path.join(__dirname, 'assets/icon.icns'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('dist/index.html');
}

app.whenReady().then(createWindow);
