import {
  check,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

const usePermissions = () => {
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

  return {
    checkPermissions,
  };
};

export default usePermissions;
