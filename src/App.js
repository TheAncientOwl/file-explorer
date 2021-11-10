import { useState, useMemo } from 'react';
import { FilesViewer } from './FilesViewer';

const formatSize = size => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

const { readdirSync, fileStatsSync, joinPath, startLocation, dirname } = window.electronAPI;

const App = () => {
  const [path, setPath] = useState(startLocation);

  const files = useMemo(
    () =>
      readdirSync(path)
        .map(file => {
          const stats = fileStatsSync(joinPath(path, file));

          return {
            name: file,
            size: stats.isFile ? formatSize(stats.size ?? 0) : null,
            directory: stats.isDirectory,
          };
        })
        .sort((a, b) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name);
          }
          return a.directory ? -1 : 1;
        }),
    [path]
  );

  const handleBack = () => setPath(dirname(path));
  console.log(path);
  const handleOpen = folder => setPath(joinPath(path, folder));

  const [searchString, setSearchString] = useState('');
  const filteredFiles = files.filter(s => s.name.startsWith(searchString));

  return (
    <div className='container mt-2'>
      <div className='form-group mt-4 mb-2'>
        <h4>{path}</h4>
        <input
          value={searchString}
          onChange={event => setSearchString(event.target.value)}
          className='form-control form-control-sm'
          placeholder='File search'
        />
        <FilesViewer files={filteredFiles} onBack={handleBack} onOpen={handleOpen} />
      </div>
    </div>
  );
};

export default App;
