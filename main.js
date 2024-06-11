const { app, Menu, BrowserWindow } = require('electron');
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
  win.webContents.setVisualZoomLevelLimits(1, 1);
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

app.whenReady().then(createWindow);
