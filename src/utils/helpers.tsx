import RNFS from 'react-native-fs';
import {DataFiles} from '../interfaces/components';
import {File, Folder} from '../interfaces/response';
import {showToast} from './toast';

interface Response {
  nameFile: string;
  extension: string;
}

export const extensionName = (name: string): Response => {
  const nameSplit = name.split('.');
  const nameFile = nameSplit[0];
  const extension = nameSplit[nameSplit.length - 1];
  return {
    nameFile,
    extension,
  };
};

export const downloadFileFirebase = async (
  file: string,
  name: string,
): Promise<boolean> => {
  const dir = RNFS.DownloadDirectoryPath;
  const path = dir + `/${name}`;
  try {
    await RNFS.downloadFile({
      fromUrl: file,
      toFile: path,
    });
    showToast('Archivo descargado');
    return true;
  } catch (error) {
    showToast('Error al descargar el archivo');
    console.log(error);
    return false;
  }
};

export const dataFilesFlatlist = (
  files: File[],
  folders: Folder[],
  dataFolder?: boolean,
) => {
  const data: DataFiles[] = [];
  let contador = 0;
  if (files.length > 0) {
    if (dataFolder) {
      files.forEach(item => {
        const {_id, image, filename, file} = item;
        data[contador] = {
          id: _id,
          icon: image,
          name: filename,
          type: 'file',
          file,
        };
        contador += 1;
      });
    } else {
      files.forEach(item => {
        const {_id, image, filename, file, folder} = item;
        if (folder !== '') return;
        data[contador] = {
          id: _id,
          icon: image,
          name: filename,
          type: 'file',
          file,
        };
        contador += 1;
      });
    }
  }
  if (folders.length > 0) {
    folders.forEach(item => {
      const {_id, icon, folder} = item;
      data[contador] = {id: _id, icon, name: folder, type: 'folder'};
      contador += 1;
    });
  }
  const dataOrganization = organizarData(data);
  return dataOrganization;
};

interface Props {
  data: DataFiles[];
  file?: File;
  folder?: Folder;
}

export const dataAddFilesFlatlist = ({data, file, folder}: Props) => {
  let dataNew: DataFiles[] = [...data];
  const newData = validateTypeData(file, folder);
  dataNew = newData ? [...dataNew, newData] : [...data];
  const dataOrganization = organizarData(dataNew);
  return dataOrganization;
};

export const dataDeleteFilesFlatlist = (data: DataFiles[], id: string) => {
  return data.filter(item => item.id !== id);
};

export const getFileById = (
  data: DataFiles[],
  id: string,
): DataFiles | undefined => {
  let resp: DataFiles | undefined = undefined;
  let bandera = false;
  data.forEach(item => {
    if (bandera) return;
    if (item.id === id) {
      resp = item;
      bandera = true;
    }
  });
  return resp;
};

export const updateData = (data: DataFiles[], id: string, name: string) => {
  return data.map(item => (item.id === id ? {...item, name} : item));
};

export const organizarData = (data: DataFiles[]) => {
  return data.sort((a, b) => {
    if (a.type === 'folder' || b.type === 'folder') {
      return -1;
    } else {
      return 1;
    }
  });
};

export const validateTypeData = (file?: File, folder?: Folder) => {
  let item: DataFiles | undefined = undefined;
  if (file) {
    const {_id, filename, image} = file;
    const newFile: DataFiles = {
      id: _id,
      name: filename,
      icon: image,
      type: 'file',
    };
    item = newFile;
  }
  if (folder) {
    const {_id, folder: folderName, icon} = folder;
    const newFolder: DataFiles = {
      id: _id,
      name: folderName,
      icon: icon,
      type: 'folder',
    };
    item = newFolder;
  }
  return item;
};
