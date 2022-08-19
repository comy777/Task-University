import {Image, Note, Schedlue, Task} from './response';
import {DayProps} from './components';

export interface DataAuth {
  email: string;
  password: string;
  repeatPassword?: string;
  username?: string;
}

export interface DataLesson {
  lesson?: string;
  teacher?: string;
  nrc?: string;
  classroom?: string;
  schedlue?: Schedlue[];
}

export interface DataLessonSave {
  lesson: string;
  teacher?: string;
  nrc: string;
  schedlue: Schedlue[];
}

export interface DataNoteSave {
  title?: string;
  body?: string;
  images: Image[];
}

export interface DataTaskSave {
  title?: string;
  body?: string;
  images: Image[];
  dayLimit?: string;
}

export interface DataUserSave {
  username: string;
  image: string;
}

export interface ValidateDays {
  days: DayProps[];
  day: string;
  setDays: (days: DayProps[]) => void;
  schedlue: string;
  selected: boolean;
  classroom: string;
}

export interface AlertProps {
  title: string;
  message: string;
  onPress: () => void;
}

export interface ActiveData {
  note?: Note;
  task?: Task;
}

export type RequestGet = 'notes' | 'tasks';

export const imageLesson =
  'https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/CLASES.jpg?itok=_5grhFgh';
