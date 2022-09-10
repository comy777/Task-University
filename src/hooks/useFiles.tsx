import {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {
  appFilesPostRequest,
  appFilesRequest,
  getFaticons,
} from '../api/request';
import {
  FileState,
  FilePicker,
  FilesUseHook,
  DataFiles,
} from '../interfaces/components';
import {
  extensionName,
  downloadFileFirebase,
  dataFilesFlatlist,
  dataDeleteFilesFlatlist,
} from '../utils/helpers';
import {showToast, showAlert} from '../utils/toast';
import useForm from './useForm';
import {
  appFilesDeleteRequest,
  appGetFolders,
  appPostFolder,
} from '../api/request';
import {useNavigation} from '@react-navigation/native';
import {dataAddFilesFlatlist, getFileById, updateData} from '../utils/helpers';
import {
  appGetFilesByFolder,
  appPostFileWithFolder,
  appUpdateFolder,
} from '../api/request';
import {StateFile} from '../interfaces/components';
import {appUpdateFile} from '../api/request';
import usePermissions from './usePermissions';

const useFiles = ({lesson, folder}: FilesUseHook) => {
  const navigation = useNavigation();
  const {checkPermissions} = usePermissions();

  const [state, setState] = useState<FileState>({
    loading: false,
    visible: false,
    modal: false,
    loadingFile: false,
    icon: 'https://cdn-icons-png.flaticon.com/512/716/716784.png',
    activeDataType: undefined,
    filePicker: undefined,
    data: [],
    id: undefined,
  });

  const {fileNameForm, handleChangeText, reset, resetFormValues} = useForm({
    fileNameForm: '',
  });

  const getData = async () => {
    setState({...state, loading: true});
    if (folder) {
      const resp = await appGetFilesByFolder(folder);
      setState({...state, loading: false});
      if (!resp) return;
      if (resp.length === 0) return;
      const files = dataFilesFlatlist(resp, [], true);
      setState({...state, data: files});
      return;
    }
    const resp = await appFilesRequest(`upload/file/${lesson}`);
    let respFolders = await appGetFolders(lesson);
    setState({...state, loading: false});
    if (resp && respFolders) {
      const data = dataFilesFlatlist(resp, respFolders);
      setState({...state, data});
    }
  };

  const handleVisible = () => setState({...state, visible: !state.visible});

  const handleModal = () => setState({...state, modal: false});

  const handleFile = async () => {
    try {
      const resp = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      const {fileCopyUri, name} = resp;
      if (fileCopyUri) {
        const {nameFile, extension} = extensionName(name);
        const data: FilePicker = resp;
        handleChangeText(nameFile, 'fileNameForm');
        const {icon} = await getFaticons(extension);
        setState({
          ...state,
          modal: true,
          visible: false,
          icon,
          activeDataType: 'filepicker',
          filePicker: data,
        });
      }
    } catch (error) {
      showToast('Cancelado');
    }
  };

  const handleSave = async () => {
    if (!fileNameForm) return;
    if (state.activeDataType === 'folder') {
      setState({...state, loadingFile: false});
      const resp = await appPostFolder(lesson, fileNameForm);
      setState({...state, loadingFile: false});
      if (!resp) return;
      stateFile({folder: resp});
    } else {
      if (!state.filePicker) return;
      const {name} = state.filePicker;
      const {extension} = extensionName(name);
      const data = state.filePicker;
      data.name = `${fileNameForm.trim()}.${extension}`;
      const formData = new FormData();
      formData.append('file', data);
      setState({...state, loadingFile: true});
      if (folder) {
        saveFileWithFolder(folder, formData);
        return;
      }
      const file = await appFilesPostRequest(lesson, formData);
      setState({...state, loadingFile: false});
      if (!file) return;
      stateFile({file});
    }
  };

  const saveFileWithFolder = async (id: string, data: FormData) => {
    const file = await appPostFileWithFolder(lesson, id, data);
    setState({...state, loadingFile: false});
    if (!file) return;
    stateFile({file});
  };

  const stateFile = ({file, folder}: StateFile) => {
    const dataNew = dataAddFilesFlatlist({data: state.data, file, folder});
    setState({
      ...state,
      modal: false,
      icon: '',
      activeDataType: undefined,
      filePicker: undefined,
      data: dataNew,
    });
    reset();
  };

  const handleClickFile = async (item: DataFiles) => {
    const {name, icon, type, id} = item;
    let nameData = name;
    if (type === 'file') {
      const {nameFile} = extensionName(name);
      nameData = nameFile;
    }
    resetFormValues({fileNameForm: nameData});
    setState({
      ...state,
      modal: true,
      filePicker: undefined,
      icon,
      activeDataType: type,
      id,
    });
  };

  const handleEditData = async () => {
    const {id, activeDataType} = state;
    if (!id) return;
    if (!activeDataType) return;
    let request: any = undefined;
    if (activeDataType === 'folder')
      request = await appUpdateFolder(`folders/${id}`, fileNameForm);
    if (activeDataType === 'file')
      request = await appUpdateFile(id, fileNameForm);
    if (!request) return;
    setState({...state, loadingFile: true});
    const resp = await request;
    setState({...state, loadingFile: false});
    if (!resp) return;
    if (activeDataType === 'folder') {
      const folders = updateData(state.data, id, fileNameForm);
      if (!folders) return;
      setState({...state, data: folders, modal: false});
    }
    if (activeDataType === 'file') {
      const files = updateData(state.data, id, fileNameForm);
      if (!files) return;
      setState({...state, data: files, modal: false});
    }
  };

  const handleDeleteFile = () => {
    const {id} = state;
    if (!id) return;
    showAlert({
      title: 'Eliminar',
      message: 'Seguro que desea eliminar este archivo?',
      onPress: async () => await deleteFile(id),
    });
  };

  const deleteFile = async (id: string) => {
    const {activeDataType} = state;
    let url = '';
    if (activeDataType) {
      if (activeDataType === 'file') url = `upload/file/${id}`;
      if (activeDataType === 'folder') url = `folders/${id}`;
    }
    setState({...state, loadingFile: true});
    const resp = await appFilesDeleteRequest(url);
    setState({...state, loadingFile: false});
    if (!resp) return;
    const newData = dataDeleteFilesFlatlist(state.data, id);
    setState({
      ...state,
      modal: false,
      activeDataType: undefined,
      id: undefined,
      data: newData,
    });
  };

  const handleDownload = async () => {
    const permission = await checkPermissions('galery');
    if (permission !== 'granted') return;
    const {id, data} = state;
    if (!id) return;
    const item = getFileById(data, id);
    if (!item) return;
    const {file, name} = item;
    if (!file) return;
    downloadFileFirebase(file, name);
    setState({...state, id: undefined, modal: false});
  };

  const handleNavigate = async (id: string) =>
    navigation.navigate('folder stack', {lesson, folder: id});

  const handleCreateFolder = () => {
    setState({
      ...state,
      modal: true,
      activeDataType: 'create folder',
      visible: false,
    });
  };

  return {
    ...state,
    handleVisible,
    handleFile,
    handleModal,
    handleChangeText,
    fileNameForm,
    handleSave,
    handleEditData,
    handleDeleteFile,
    handleDownload,
    handleNavigate,
    handleCreateFolder,
    getData,
    handleClickFile,
  };
};

export default useFiles;
