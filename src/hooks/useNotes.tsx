import {
  appGetNotes,
  appDeleteRequest,
  appGetTasks,
  appPostNotes,
  appPostTasks,
  appPutTasksComplete,
} from '../api/request';
import useContextApp from './useContextApp';
import useForm from './useForm';
import useImages from './useImages';
import {validateNote, validateTask} from '../utils/validate';
import {
  DataNoteSave,
  RequestGet,
  DataTaskSave,
  ActiveData,
} from '../interfaces/data';
import {Note, Task, Image} from '../interfaces/response';
import {useNavigation} from '@react-navigation/native';
import {showAlert} from '../utils/toast';
import moment from 'moment';
import {appPutTasks, appPutNotes} from '../api/request';
import {useState} from 'react';

const useNotes = () => {
  const navigation = useNavigation();
  const [color, setColor] = useState('white');
  const {
    loading,
    setLoading,
    setNotes,
    notes,
    setModal,
    setActiveData,
    setChildren,
    activeData,
    tasks,
    setTasks,
    setVisibleFab,
    visibleFab,
    datePicker,
    setDatePicker,
    setVisibleDatePicker,
    visibleDatePicker,
    setVisibleColor,
    visibleColor,
  } = useContextApp();
  const {title, body, handleChangeText, reset, resetFormValues} = useForm({
    title: '',
    body: '',
  });
  const {
    images,
    getImagesCamera,
    getImagesGalery,
    deleteImage,
    image,
    setImage,
    saveImagesCloudinary,
    resetImages,
    setActiveImages,
    setImages,
    activeImages,
  } = useImages();
  const handleGetNotes = async (type: RequestGet, id: string) => {
    setLoading();
    if (type === 'notes') {
      const resp = await appGetNotes(`notes/${id}`);
      if (!resp) return;
      setNotes(resp);
    } else {
      const resp = await appGetTasks(`tasks/${id}`);
      if (!resp) return;
      setTasks(resp);
    }
    setLoading();
  };
  const handleSaveNote = async (
    id: string,
    data: DataNoteSave,
    note?: Note,
  ) => {
    const validate = validateNote(data);
    if (!validate) return;
    if (note) {
      await handleEdit(note._id, data);
      return;
    }
    const resp = await appPostNotes(`notes/${id}`, data);
    setLoading();
    if (!resp) return;
    setColor('white');
    setNotes([...notes, resp]);
    setVisibleFab();
    reset();
    resetImages();
  };
  const handleSaveTask = async (
    id: string,
    data: DataTaskSave,
    task?: Task,
  ) => {
    const validate = validateTask(data);
    if (!validate) {
      setLoading();
      return;
    }
    if (task) {
      await handleEdit(task._id, data, true);
      return;
    }
    const resp = await appPostTasks(`tasks/${id}`, data);
    setLoading();
    if (!resp) return;
    setTasks([...tasks, resp]);
    setDatePicker('');
    reset();
    resetImages();
  };
  const handleSave = async (
    id: string,
    note?: Note,
    task?: Task,
    saveTask?: boolean,
  ) => {
    let data: DataNoteSave = {title, body, images: [], color};
    let dataTask: DataTaskSave = {
      title,
      body,
      images: [],
      dayLimit: datePicker ? datePicker : undefined,
    };
    setLoading();
    if (images.length > 0) {
      const resp = await saveImagesCloudinary();
      if (saveTask) {
        dataTask.images = resp;
      } else {
        data.images = resp;
      }
    }
    if (saveTask) {
      handleSaveTask(id, dataTask, task);
    } else {
      handleSaveNote(id, data, note);
    }
  };
  const handleEdit = async (
    id: string,
    data: DataNoteSave | DataTaskSave,
    saveTask?: boolean,
  ) => {
    data.images = [...data.images, ...activeImages];
    if (saveTask) {
      const resp = await appPutTasks(`tasks/${id}`, data);
      setLoading();
      if (!resp) return;
      const newTasks = tasks.map(item => (item._id === resp._id ? resp : item));
      setTasks(newTasks);
      setDatePicker('');
    } else {
      const resp = await appPutNotes(`notes/${id}`, data);
      setLoading();
      if (!resp) return;
      setColor('white');
      setVisibleFab();
      const newNotes = notes.map(item => (item._id === resp._id ? resp : item));
      setNotes(newNotes);
    }
    resetImages();
    reset();
  };
  const handleDelete = async () => {
    if (!activeData) return;
    const {note, task} = activeData;
    let url = '';
    if (note) url = `notes/${note._id}`;
    if (task) url = `tasks/${task._id}`;
    setLoading();
    const resp = await appDeleteRequest(url);
    setLoading();
    if (!resp) return;
    if (note) {
      const newNotes = notes.filter(item => item._id !== note._id);
      setNotes(newNotes);
    }
    if (task) {
      const newtasks = tasks.filter(item => item._id !== task._id);
      setTasks(newtasks);
    }
    setModal();
  };
  const handleActiveNote = (note?: Note, task?: Task) => {
    let data = {title: '', body: ''};
    if (note) {
      const {title, body, images, color} = note;
      setColor(color);
      getImages(images);
      data = {title, body};
      setActiveImages(note.images);
    }
    if (task) {
      const {title, body, images, dayLimit} = task;
      const spliteDate = dayLimit.split('T');
      getImages(images);
      data = {title, body};
      setActiveImages(task.images);
      setDatePicker(spliteDate[0]);
    }
    resetFormValues(data);
  };
  const getImages = (images: Image[]) => {
    if (images.length > 0) {
      const imagesResp = images.map((item, index) => {
        const {url} = item;
        if (index === 0) setImage({uri: url});
        return {uri: item.url};
      });
      setImages(imagesResp);
    }
  };
  const handleActiveData = ({note, task}: ActiveData) => {
    if (note) {
      setActiveData({note});
      setChildren('note');
    }
    if (task) {
      const {dayLimit} = task;
      const spliteDate = dayLimit.split('T');
      setActiveData({task: {...task, dayLimit: spliteDate[0]}});
      setChildren('task');
    }
    setModal();
  };
  const handleShowDelete = () => {
    if (activeData) {
      if (activeData.note) {
        showAlert({
          title: 'Borrar',
          message: 'Seguro que quiere borrar la nota?',
          onPress: handleDelete,
        });
      }
      if (activeData.task) {
        showAlert({
          title: 'Borrar',
          message: 'Seguro que quiere borrar la tarea?',
          onPress: handleDelete,
        });
      }
    }
  };
  const handleNavigateEdit = () => {
    if (!activeData) return;
    setModal();
    const {note, task} = activeData;
    if (note) navigation.navigate('create note', {note, lesson: note._id});
    if (task) navigation.navigate('create task', {task, lesson: task._id});
  };
  const handleFabButtons = (type: string, id: string, task?: Task) => {
    if (type === 'camera') {
      getImagesCamera();
    }
    if (type === 'galery') {
      getImagesGalery();
    }
    if (type === 'calendar') {
      setVisibleDatePicker();
    }
    if (type === 'save') {
      handleSave(id, undefined, task, true);
    }
    setVisibleFab();
  };
  const handleDatePicker = (data: Date) => {
    const dataString = moment(data).format('L');
    setVisibleDatePicker();
    setDatePicker(dataString);
  };
  const handleComplete = async (id: string) => {
    const resp = await appPutTasksComplete(id);
    setModal();
    if (!resp) return;
    const newTasks = tasks.map(item =>
      item._id === id ? {...item, complete: !item.complete} : item,
    );
    setTasks(newTasks);
  };
  const handleSetColor = () => {
    setVisibleFab();
    setVisibleColor();
  };

  return {
    loading,
    setLoading,
    handleGetNotes,
    notes,
    title,
    body,
    handleChangeText,
    images,
    getImagesCamera,
    getImagesGalery,
    deleteImage,
    image,
    setImage,
    handleSave,
    resetFormValues,
    handleActiveNote,
    handleActiveData,
    handleNavigateEdit,
    handleShowDelete,
    tasks,
    setVisibleFab,
    visibleFab,
    handleFabButtons,
    visibleDatePicker,
    handleDatePicker,
    setVisibleDatePicker,
    handleComplete,
    datePicker,
    handleSetColor,
    visibleColor,
    color,
    setColor,
  };
};

export default useNotes;
