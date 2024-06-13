const { contextBridge, ipcRenderer, webFrame } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  fetchData: (id) => ipcRenderer.invoke('fetch-data', id),
  fetchAllData: () => ipcRenderer.invoke('fetch-all-data'),
  saveData: (id, value) => ipcRenderer.invoke('save-data', id, value),
  deleteData: (id) => ipcRenderer.invoke('delete-data', id),
  setZoomFactor: (factor) => webFrame.setZoomFactor(factor),
  setVisualZoomLevelLimits: (min, max) =>
    webFrame.setVisualZoomLevelLimits(min, max),
  // Remove import for production
  importDatabase: () => ipcRenderer.invoke('import-database'),
  exportDatabase: () => ipcRenderer.invoke('export-database'),
  deleteDatabase: () => ipcRenderer.invoke('delete-database'),
});
