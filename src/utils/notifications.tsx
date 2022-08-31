import notifee, {AndroidGroupAlertBehavior} from '@notifee/react-native';
import {appGetLessons, appGetTasks, appGetMeets} from '../api/request';
import {Task} from '../interfaces/response';
import moment from 'moment';
import {validateDiffDateMeet} from './validate';

interface Props {
  title: string;
  message: string;
}

export const showNotification = async ({title, message}: Props) => {
  // Request permissions (required for iOS)
  //await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title,
    body: message,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
      groupSummary: true,
      groupId: 'default',
      groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY,
    },
  });

  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;
    if (!pressAction) return;
    if (pressAction.id === 'default') {
      if (!notification) return;
      // Update external API
      if (!notification.id) return;
      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }
  });
};

export const getDataTasks = async (): Promise<Task[] | undefined> => {
  const lessons = await appGetLessons('lessons');
  // const tasks = await appGetTasks('/tasks');
  const tareas: any = [];
  if (!lessons) return;
  let contador = 0;
  return new Promise(resolve => {
    lessons.forEach(async (item, i) => {
      const {_id} = item;
      const tasks = await appGetTasks(`tasks/${_id}`);
      if (!tasks) return;
      if (tasks.length > 0) {
        tasks.forEach(item => {
          tareas[contador] = item;
          contador += 1;
        });
      }
      if (i === lessons.length - 1) resolve(tareas);
    });
  });
};

export const getDataMeets = async () => {
  const resp = await appGetMeets();
  let bandera = false;
  resp.forEach(item => {
    if (bandera) return;
    const {date_meet} = item;
    const validateDay = validateDiffDateMeet(date_meet);
    if (validateDay) {
      bandera = true;
      return;
    }
  });
  if (bandera)
    showNotification({title: 'Reunion', message: 'Tiene reuniones pendientes'});
};

export const getNotifications = async () => {
  await getDataMeets();
  const data = await getDataTasks();
  let bandera: boolean = false;
  if (!data) return;
  data.forEach((item, i) => {
    if (bandera) return;
    const {dayLimit} = item;
    const newDate = moment(dayLimit);
    const diferencia = newDate.diff(new Date(Date.now()), 'days');
    if (diferencia <= 5 && diferencia >= 0) {
      bandera = true;
      return;
    }
  });
  if (bandera) {
    showNotification({
      title: 'Tarea',
      message: 'Tiene tareas a punto de vencerse',
    });
  }
};
