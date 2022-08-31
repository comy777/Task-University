import {
  DataAuth,
  DataLesson,
  ValidateDays,
  DataNoteSave,
  DataTaskSave,
} from '../interfaces/data';
import {showToast} from './toast';
import {DayProps} from '../interfaces/components';
import {Schedlue} from '../interfaces/response';
import moment from 'moment';
import {DataMeetForm} from '../interfaces/data';

export const formDataAuth = (value: string) => {
  const form =
    value === 'login'
      ? {email: '', password: ''}
      : {email: '', password: '', repeatPassword: '', username: ''};
  return form;
};

export const formDataApp = (value: string) => {
  const form =
    value === 'lesson'
      ? {lesson: '', teacher: '', nrc: ''}
      : {email: '', password: '', repeatPassword: '', username: ''};
  return form;
};

export const validateForm = ({email, password, repeatPassword}: DataAuth) => {
  if (!email) {
    showToast('El correo electronico es requerido');
    return false;
  }
  if (!password) {
    showToast('La contraseña es obligatoria');
    return false;
  }
  if (password.length < 8) {
    showToast('La contraseña debe tener mas de 8 caracteres');
    return false;
  }
  if (repeatPassword) {
    if (password !== repeatPassword) {
      showToast('Las contraseñas no coinciden');
      return false;
    }
  }
  return true;
};

export const validateLesson = ({
  lesson,
  teacher,
  nrc,
  schedlue,
  classroom,
}: DataLesson) => {
  if (!lesson && !teacher && !nrc && !schedlue && !classroom) return false;
  if (!lesson) {
    showToast('El nombre de la clase es obligatorio');
    return false;
  }
  if (!nrc) {
    showToast('El nrc de la clase es obligatorio');
    return false;
  }
  if (!schedlue || schedlue.length === 0) {
    showToast('La clase debe tener un horario');
    return false;
  }
  return {
    lesson,
    teacher,
    nrc,
    schedlue,
    classroom,
  };
};

export const setDataDays = ({
  days,
  day,
  setDays,
  schedlue,
  selected,
  classroom,
}: ValidateDays) => {
  let bandera = false;
  if (selected) {
    days.map(item => {
      if (item.day === day) {
        if (item.selected) {
          const newDays = days.map(item =>
            item.day === day ? {...item, selected: false} : {...item},
          );
          setDays(newDays);
          bandera = true;
        }
      }
    });
  } else {
    const newDays = days.map(item =>
      item.day === day ? {...item, selected: true, schedlue} : {...item},
    );
    setDays(newDays);
  }
  return bandera;
};

export const getDaysValidate = (data: DayProps[]) => {
  const resp: Schedlue[] = [];
  let contador = 0;
  data.map((item, i) => {
    if (item.selected) {
      resp[contador] = {
        day: item.day,
        hours: item.schedlue,
        classroom: item.classroom,
      };
      contador += 1;
    }
  });
  return resp;
};

export const validateNote = ({title, body, images, color}: DataNoteSave) => {
  if (!title && !body && images.length === 0) return false;
  return {title, body, images, color};
};

export const validateTask = ({title, body, dayLimit, images}: DataTaskSave) => {
  if (!title && !body && images.length === 0 && !dayLimit) return false;
  if (!dayLimit) {
    showToast('Debe tener una fecha');
    return false;
  }
  return {title, body, images, dayLimit};
};

export const validateDayLimit = (dayLimit: string): string => {
  const newDate = moment(dayLimit);
  const diferencia = newDate.diff(new Date(Date.now()), 'days');
  if (diferencia <= 5) return '#FF5252';
  return '#FF9800';
};

export const validateDiffDate = (e: Date) => {
  const fechaActual = moment();
  if (moment(e).diff(fechaActual, 'days') < 0) {
    showToast('La fecha no es valida');
    return false;
  }
  if (
    moment(e).diff(fechaActual, 'hours') < 0 ||
    moment(e).diff(fechaActual, 'minutes') < 0
  ) {
    showToast('La hora no es valida');
    return false;
  }
  const date = moment(e).format('YYYY-MM-DD');
  const hour = moment(e).format('LT');
  return {date, hour};
};

export const validateDiffDateMeet = (e: string) => {
  const fechaActual = moment();
  if (moment(e).diff(fechaActual, 'days') === 0) {
    return true;
  }
  if (moment(e).diff(fechaActual, 'hours') === 1) {
    return true;
  }
  return false;
};

export const validateFormMeet = (data: DataMeetForm) => {
  const {meet, date_meet, start_time} = data;
  if (!meet) {
    showToast('El nombre de la reunion es obligatorio');
    return;
  }
  if (!date_meet) {
    showToast('La fecha de la reunion es obligatoria');
    return;
  }
  if (!start_time) {
    showToast('La hora de la reunion es obligatoria');
    return;
  }
  return true;
};
