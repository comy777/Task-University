import {useContext} from 'react';
import {AppContext} from '../context/AppContext';
import {getData, deleteData} from '../utils/storage';
import {ImageDataProps} from '../interfaces/components';
import useImages from './useImages';
import {DataUserSave} from '../interfaces/data';
import useForm from './useForm';
import {authUserRequest} from '../api/request';

const useUser = () => {
  const {
    setToken,
    setEditable,
    editable,
    user,
    setUser,
    appState,
    setLoadingAuth,
    restoreUser,
    searchVisible,
  } = useContext(AppContext);
  const {setModal} = appState;
  const {
    image,
    setImage,
    getImagesCamera,
    getImagesGalery,
    images,
    deleteImage,
    setImages,
    saveImagesCloudinary,
  } = useImages();
  const {username, handleChangeText} = useForm({
    username: user ? user.username : '',
  });
  const handleGetToken = async () => {
    const resp = await getData('token');
    if (!resp) return;
    setToken(resp);
  };
  const handleUser = () => {
    if (!user) return;
    const {image} = user;
    let dataImage: ImageDataProps = {uri: image};
    if (editable) setEditable();
    if (images.length > 0) setImages([]);
    setImage(dataImage);
    const {setChildren, setModal} = appState;
    setChildren('user');
    setModal();
  };
  const handleChangeImage = async (type: string) => {
    if (type === 'camera') {
      await getImagesCamera();
    } else {
      await getImagesGalery();
    }
    if (images.length > 0) {
      if (!image) return;
      setImages([image]);
    }
  };
  const handleSave = async () => {
    if (!user) return;
    const {setModal} = appState;
    let userData: DataUserSave = {username, image: ''};
    if (image) {
      if (image.uri) userData.image = image.uri;
    }
    if (images.length > 0) {
      const respImage = await saveImagesCloudinary();
      userData.image = respImage[0].url;
    }
    const resp = await authUserRequest('put', userData);
    if (!resp) return;
    setUser(resp);
    setModal();
  };
  const handleEditable = () => {
    if (!user) return;
    if (user.image) {
      setImage({uri: user.image});
    }
    if (editable) handleSave();
    setEditable();
  };
  const handleLogout = async () => {
    setLoadingAuth();
    await deleteData('token');
    await deleteData('themeDark');
    setModal();
    restoreUser();
    setLoadingAuth();
  };
  return {
    deleteImage,
    username,
    handleChangeText,
    handleGetToken,
    handleUser,
    handleChangeImage,
    handleEditable,
    handleLogout,
    editable,
    image,
    user,
    searchVisible,
  };
};

export default useUser;
