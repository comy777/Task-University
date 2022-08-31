import {useState} from 'react';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {showToast} from '../utils/toast';
import {ImageDataProps} from '../interfaces/components';
import {Image} from '../interfaces/response';
import {apiTask} from '../api/config';
import {
  check,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

const useImages = () => {
  const [images, setImages] = useState<ImageDataProps[]>([]);
  const [image, setImage] = useState<ImageDataProps>();
  const [imagesDelete, setImagesDelete] = useState<Image[]>([]);
  const [activeImages, setActiveImages] = useState<Image[]>([]);

  const getPermissions = async (type: string): Promise<PermissionStatus> => {
    let resp: PermissionStatus = 'denied';
    if (type === 'camera') {
      resp = await request(PERMISSIONS.ANDROID.CAMERA);
    }
    if (type === 'galery') {
      resp = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    }
    return resp;
  };

  const checkPermissions = async (type: string): Promise<PermissionStatus> => {
    let resp: PermissionStatus = 'denied';
    if (type === 'camera') {
      resp = await check(PERMISSIONS.ANDROID.CAMERA);
      if (resp === 'denied') resp = await getPermissions(type);
      if (resp === 'blocked') await openSettings();
    }
    if (type === 'galery') {
      resp = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (resp === 'denied') resp = await getPermissions(type);
      if (resp === 'blocked') await openSettings();
    }
    return resp;
  };

  const getImagesGalery = async () => {
    const respPermissions = await checkPermissions('galery');
    if (respPermissions !== 'granted') return;
    const resp = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 5,
    });
    validateImages(resp);
  };
  const getImagesCamera = async () => {
    const respPermissions = await checkPermissions('camera');
    if (respPermissions !== 'granted') return;
    const resp = await launchCamera({mediaType: 'photo'});
    validateImages(resp);
  };
  const deleteImage = () => {
    if (!image) return;
    const imagesData = images.filter(item => item.uri !== image.uri);
    if (image.uri) setImagesDelete([...imagesDelete, {url: image.uri}]);
    setImage(imagesData[0]);
    setImages(imagesData);
    if (image.uri) {
      const nameImage = image.uri.split('//');
      if (nameImage.includes('https:')) {
        const imagenes = activeImages.filter(item => item.url !== image.uri);
        setActiveImages(imagenes);
      }
    }
  };
  const saveImagesCloudinary = async (): Promise<Image[]> => {
    return new Promise(reject => {
      const dataResponse: Image[] = [];
      let contador = 0;
      images.map(async (item, index) => {
        if (item.fileName) {
          const {fileName, type, uri} = item;
          const fileUpload = {name: fileName, uri, type};
          const formData = new FormData();
          formData.append('image', fileUpload);
          const resp = await apiTask.put('upload', formData);
          dataResponse[contador] = {url: resp.data.url};
          contador += 1;
        }
        if (index === images.length - 1) reject(dataResponse);
      });
    });
  };
  const deleteImagesCloudinary = async () => {
    await imagesDelete.map(async item => {
      const {url} = item;
      const idImage = url.split('/');
      if (!idImage.includes('https:')) return;
      const id = idImage[idImage.length - 1];
      const [secureUrl] = id.split('.');
      await apiTask.delete(`upload/${secureUrl}`);
    });
  };
  const resetImages = () => {
    setImage(undefined);
    setActiveImages([]);
    setImages([]);
    setImagesDelete([]);
  };
  const validateImages = (resp: ImagePickerResponse) => {
    if (!resp.assets) {
      showToast('Cancelado');
      return;
    }
    const {uri, base64, fileName, type} = resp.assets[0];
    const data = {uri, base64, fileName, type};
    if (images.length - 1 === 4) {
      setImage(data);
      const imagesData = [...images];
      imagesData[images.length - 1] = data;
      setImages(imagesData);
      return;
    }
    setImage(data);
    setImages([...images, data]);
  };
  return {
    images,
    getImagesCamera,
    getImagesGalery,
    setImage,
    image,
    deleteImage,
    saveImagesCloudinary,
    resetImages,
    setImages,
    deleteImagesCloudinary,
    imagesDelete,
    activeImages,
    setActiveImages,
  };
};

export default useImages;
