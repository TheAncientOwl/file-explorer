const { contextBridge } = require('electron');

const fs = require('fs');
const path = require('path');

const fileStatsSync = path => {
  const stats = fs.statSync(path);

  return {
    size: stats.size,
    isDirectory: stats.isDirectory(),
    isFile: stats.isFile(),
  };
};

contextBridge.exposeInMainWorld('electronAPI', {
  readdirSync: fs.readdirSync,
  fileStatsSync,
  joinPath: path.join,
  dirname: path.dirname,
  startLocation: __dirname,
});
