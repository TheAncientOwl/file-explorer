import { IconFolder, IconFile, IconFolderOpen } from './Icons';

export const FilesViewer = ({ files, onBack, onOpen }) => (
  <table className='table'>
    <tbody>
      <tr className='clickable pointer' onClick={onBack}>
        <td className='icon-row'>
          <IconFolderOpen />
        </td>
        <td>...</td>
        <td></td>
      </tr>

      {files.map(({ name, directory, size }, index) => {
        return (
          <tr key={index} className={`clickable ${directory && 'pointer'}`} onClick={() => directory && onOpen(name)}>
            <td className='icon-row'>{directory ? <IconFolder /> : <IconFile />}</td>
            <td>{name}</td>
            <td>
              <span className='float-end'>{size}</span>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
