// Generated by https://quicktype.io

export interface DefaultResponse {
  msg?: string;
  error?: string;
}

export interface AuthResponse {
  token: string;
  error?: string;
  msg?: string;
}

export interface UserResponse {
  user: User;
  error?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface DeleteResponse {
  msg: string;
  error?: string;
}

export interface GetResponse {
  lessons?: Lesson[];
  notes?: Note[];
  tasks?: Task[];
  schedlue?: SchedlueApi[];
  meets?: Meet[];
  error?: string;
}

export interface SchedlueResponse {
  schedlue: SchedlueApi[];
}

export interface SchedlueApi {
  _id: string;
  day: string;
  schedlue: string[];
  classroom: string;
}

export interface DataSchedlueSave {
  day: string;
  schedlue: string[];
  classroom: string;
}

export interface LessonsResponse {
  lessons: Lesson[];
  error?: string;
}

export interface LessonSaveResponse {
  lesson: Lesson;
  error?: string;
}

export interface NoteSaveResponse {
  note: Note;
  error?: string;
}

export interface Lesson {
  _id: string;
  lesson: string;
  nrc: number;
  teacher: string;
  schedlue: Schedlue[];
  classroom: string;
  createdAt: string;
  updatedAt: string;
  type: string;
}

export interface NoteResponse {
  note: Note;
}

export interface Note {
  title: string;
  body: string;
  images: Image[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  color: string;
}

export interface Image {
  url: string;
}

export interface Schedlue {
  day: string;
  hours: string;
  classroom: string;
}

export interface SaveTaskResponse {
  task: Task;
  error?: string;
}

export interface Task {
  title: string;
  body: string;
  complete: boolean;
  images: Image[];
  dayLimit: string;
  _id: string;
  lesson: string;
  createdAt: string;
  updatedAt: string;
  type: string;
}

export interface SearchResponse {
  type: string;
  _id: string;
  lesson: string;
  nrc?: number;
  teacher?: string;
  schedlue?: Schedlue[];
  classroom?: string;
  createdAt: string;
  updatedAt: string;
  title?: string;
  body?: string;
  complete?: boolean;
  images?: any[];
  dayLimit?: string;
}

export interface MeetsResponse {
  meet: Meet;
  msg?: string;
  error?: string;
}

export interface Meet {
  _id: string;
  meet: string;
  date_meet: string;
  start_time: string;
  link: string;
}

export interface FilesResponse {
  files: File[];
  error?: string;
}

export interface FileResponse {
  file: File;
  error?: string;
}

export interface File {
  filename: string;
  file: string;
  lesson: string;
  refFile: string;
  _id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  folder: string;
}

export interface GetIcon {
  icon: string;
}

export interface GetFoldersResponse {
  folders: Folder[];
  error?: string;
}

export interface Folder {
  _id: string;
  folder: string;
  files: File[];
  lesson: string;
  createdAt: string;
  updatedAt: string;
  icon: string;
}

export interface File {
  file: string;
}

export interface FolderPostResponse {
  folder: Folder;
  error?: string;
}
