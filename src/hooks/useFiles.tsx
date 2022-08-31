import {useEffect, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {
  appFilesPostRequest,
  appFilesRequest,
  getFaticons,
} from '../api/request';
import {FileState, FilePicker} from '../interfaces/components';
import {File} from '../interfaces/response';
import {extensionName} from '../utils/helpers';
import {showToast, showAlert} from '../utils/toast';
import useForm from './useForm';
import {appFilesDeleteRequest, appGetFileDownload} from '../api/request';
import {Linking} from 'react-native';

const useFiles = (id: string) => {
  const [state, setState] = useState<FileState>({
    files: [],
    filePicker: undefined,
    loading: false,
    visible: false,
    modal: false,
    loadingFile: false,
    activeFile: undefined,
  });

  const {fileNameForm, handleChangeText, reset} = useForm({fileNameForm: ''});

  const getFiles = async () => {
    setState({...state, loading: true});
    const resp = await appFilesRequest(id);
    setState({...state, loading: false});
    if (resp.length === 0) return;
    setState({...state, files: resp});
  };

  const handleVisible = () => setState({...state, visible: !state.visible});

  const handleModal = () => {
    setState({...state, modal: false});
  };

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
        data.icon = icon;
        setState({
          ...state,
          filePicker: data,
          activeFile: undefined,
          modal: true,
          visible: false,
        });
      }
    } catch (error) {
      showToast('Cancelado');
    }
  };

  const handleSave = async () => {
    if (!state.filePicker) return;
    const {name} = state.filePicker;
    const {extension} = extensionName(name);
    const {icon, ...dataForm} = state.filePicker;
    const data = dataForm;
    data.name = `${fileNameForm.trim()}.${extension}`;
    const formData = new FormData();
    formData.append('file', data);
    setState({...state, loadingFile: true});
    const file = await appFilesPostRequest(id, formData);
    setState({...state, loadingFile: false});
    if (!file) return;
    const newFiles = [...state.files, file];
    setState({...state, files: newFiles, modal: false, filePicker: undefined});
    reset();
  };

  const handleEditFile = async (file: File) => {
    const {filename} = file;
    const {nameFile} = extensionName(filename);
    handleChangeText(nameFile, 'fileNameForm');
    setState({...state, modal: true, filePicker: undefined, activeFile: file});
  };

  const handleDeleteFile = () => {
    if (!state.activeFile) return;
    const {_id} = state.activeFile;
    showAlert({
      title: 'Eliminar',
      message: 'Seguro que desea eliminar este archivo?',
      onPress: async () => await deleteFile(_id),
    });
  };

  const deleteFile = async (id: string) => {
    setState({...state, loadingFile: true});
    const resp = await appFilesDeleteRequest(id);
    setState({...state, loadingFile: false});
    if (!resp) return;
    const newFiles = state.files.filter(item => item._id !== id);
    setState({...state, files: newFiles, activeFile: undefined, modal: false});
  };

  const handleDownload = async () => {
    const {activeFile} = state;
    if (!activeFile) return;
    const {file} = activeFile;
    await appGetFileDownload(file);
  };

  useEffect(() => {
    getFiles();
  }, []);

  return {
    ...state,
    handleVisible,
    handleFile,
    handleModal,
    handleChangeText,
    fileNameForm,
    handleSave,
    handleEditFile,
    handleDeleteFile,
    handleDownload,
  };
};

export default useFiles;
