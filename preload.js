const { contextBridge, ipcRenderer, webFrame } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  fetchData: (key) => ipcRenderer.invoke('fetch-data', key),
  fetchAllData: () => ipcRenderer.invoke('fetch-all-data'),
  saveData: (key, value) => ipcRenderer.invoke('save-data', key, value),
  setZoomFactor: (factor) => webFrame.setZoomFactor(factor),
  setVisualZoomLevelLimits: (min, max) =>
    webFrame.setVisualZoomLevelLimits(min, max),
  importDatabase: () => ipcRenderer.invoke('import-database'),
  exportDatabase: () => ipcRenderer.invoke('export-database'),
  deleteDatabase: () => ipcRenderer.invoke('delete-database'),
  // showOpenDialog: (options) => console.log(options),
});
