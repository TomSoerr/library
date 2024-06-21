const { BrowserWindow, Menu } = require('electron');
const path = require('path');

const browserWindowOptions = {
  width: 1280,
  height: 572,
  minWidth: 540,
  minHeight: 600,
  icon: path.join(__dirname, '../assets/icon.icns'),
  webPreferences: {
    preload: path.join(__dirname, './preload.js'),
    nodeIntegration: false,
    contextIsolation: true,
    sandbox: true,
    disableBlinkFeatures: 'Eval',
    webviewTag: false,
    devTools: process.env.NODE_ENV === 'development',
  },
};

const menuOptions = [
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
];

function createWindow() {
  const win = new BrowserWindow(browserWindowOptions);
  // Remove before production
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  // Load main file
  win.loadFile(path.join(__dirname, 'dist/index.html'));

  // Set up menu to block zooming
  const menu = Menu.buildFromTemplate(menuOptions);
  Menu.setApplicationMenu(menu);

  win.webContents.setVisualZoomLevelLimits(1, 1);
}

module.exports = createWindow;
