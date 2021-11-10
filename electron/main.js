const { app, BrowserWindow } = require('electron');
const path = require('path');

console.log(__dirname);

const createWindow = () => {
  console.log(app.getAppPath());
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'electronAPI.js'),
    },
  });

  window.loadURL('http://localhost:3000');
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});