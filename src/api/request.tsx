import {apiTask} from './config';
import {
  AuthResponse,
  DeleteResponse,
  File,
  FileResponse,
  Folder,
  GetFoldersResponse,
  GetResponse,
  Meet,
  SchedlueResponse,
  UserResponse,
} from '../interfaces/response';
import {
  DataAuth,
  DataLessonSave,
  DataNoteSave,
  DataTaskSave,
  DataUserSave,
} from '../interfaces/data';
import {saveData} from '../utils/storage';
import {showToast} from '../utils/toast';
import {
  SearchResponse,
  MeetsResponse,
  GetIcon,
  FilesResponse,
} from '../interfaces/response';
import {DataMeetForm} from '../interfaces/data';
import {FolderPostResponse} from '../interfaces/response';
import {
  Note,
  Task,
  DataSchedlueSave,
  Lesson,
  DefaultResponse,
} from '../interfaces/response';

export const authResetPassword = async (email: string) => {
  const resp = await apiTask.post<DefaultResponse>('auth/forget-password', {
    email,
  });
  if (resp.data.error) showToast(resp.data.error);
  if (resp.data.msg) showToast(resp.data.msg);
};

export const authRequest = async (url: string, data: DataAuth) => {
  const resp = await apiTask.post<AuthResponse>(url, data);
  if (resp.data.error) {
    showToast(resp.data.error);
    return false;
  }
  if (resp.data.msg) {
    showToast(resp.data.msg);
    return false;
  }
  const {token} = resp.data;
  saveData('token', token);
  return token;
};

export const authUserRequest = async (method: string, data?: DataUserSave) => {
  const request =
    method === 'get'
      ? await apiTask.get<UserResponse>('auth')
      : await apiTask.put<UserResponse>('auth', data);
  const resp = request;
  if (resp.data.error) {
    showToast(resp.data.error);
    return false;
  }
  const {user} = resp.data;
  return user;
};

export const appGetRequest = async (url: string): Promise<GetResponse> => {
  const resp = await apiTask.get(url);
  if (resp.data.error) {
    showToast(resp.data.error);
  }
  return resp.data;
};

export const appGetLessons = async (url: string) => {
  const {lessons} = await appGetRequest(url);
  return lessons;
};

export const appGetNotes = async (url: string) => {
  const {notes} = await appGetRequest(url);
  return notes;
};

export const appGetTasks = async (url: string) => {
  const {tasks} = await appGetRequest(url);
  if (tasks) {
    tasks.sort(ordenar);
  }
  return tasks;
};

const ordenar = (a: Task, b: Task) => {
  if (a.dayLimit > b.dayLimit) return -1;
  if (a.dayLimit < b.dayLimit) return 1;
  return 0;
};

export const appGetSchedlue = async (): Promise<SchedlueResponse> => {
  const resp = await apiTask.get<SchedlueResponse>('schedlue');
  return resp.data;
};

export const appGetMeets = async (): Promise<Meet[]> => {
  const resp = await apiTask.get('meets');
  return resp.data.meets;
};

export const appPostRequest = async (
  url: string,
  data: DataLessonSave | DataNoteSave | DataTaskSave | DataSchedlueSave,
) => {
  const resp = await apiTask.post(url, data);
  if (resp.data.error) {
    showToast(resp.data.error);
    return false;
  }
  return resp.data;
};

export const appPostLessons = async (
  url: string,
  data: DataLessonSave,
): Promise<Lesson> => {
  const {lesson} = await appPostRequest(url, data);
  return lesson;
};

export const appPostNotes = async (
  url: string,
  data: DataNoteSave,
): Promise<Note> => {
  const {note} = await appPostRequest(url, data);
  return note;
};

export const appPostTasks = async (
  url: string,
  data: DataTaskSave,
): Promise<Task> => {
  const {task} = await appPostRequest(url, data);
  return task;
};

export const appPutRequest = async (
  url: string,
  data: DataLessonSave | DataNoteSave | DataTaskSave,
) => {
  const resp = await apiTask.put(url, data);
  if (resp.data.error) {
    showToast(resp.data.error);
    return false;
  }
  return resp.data;
};

export const appPutLessons = async (
  url: string,
  data: DataLessonSave,
): Promise<Lesson> => {
  const {lesson} = await appPutRequest(url, data);
  return lesson;
};

export const appPutNotes = async (
  url: string,
  data: DataNoteSave,
): Promise<Note> => {
  const {note} = await appPutRequest(url, data);
  return note;
};

export const appPutTasks = async (
  url: string,
  data: DataTaskSave,
): Promise<Task> => {
  const {task} = await appPutRequest(url, data);
  return task;
};

export const appPutTasksComplete = async (id: string) => {
  const resp = await apiTask.put<DeleteResponse>(`tasks/complete/${id}`);
  if (resp.data.error) {
    showToast(resp.data.error);
    return false;
  }
  showToast(resp.data.msg);
  return true;
};

export const appDeleteRequest = async (url: string) => {
  const resp = await apiTask.delete<DeleteResponse>(url);
  if (resp.data.error) {
    showToast(resp.data.error);
    return false;
  }
  showToast(resp.data.msg);
  return true;
};

export const appSearch = async (search: string): Promise<SearchResponse[]> => {
  const resp = await apiTask.get<SearchResponse[]>(`/search/${search}`);
  return resp.data;
};

const appMeetsRequest = async (
  url: string,
  type: string,
  data: DataMeetForm,
) => {
  const request =
    type === 'post'
      ? await apiTask.post<MeetsResponse>(url, data)
      : await apiTask.put<MeetsResponse>(url, data);
  const resp = await request;
  if (resp.data.error) {
    showToast(resp.data.error);
    return;
  }
  if (resp.data.msg) {
    showToast(resp.data.msg);
    return;
  }
  return resp.data.meet;
};

export const appPostMeet = async (
  data: DataMeetForm,
): Promise<Meet | undefined> => {
  const resp = await appMeetsRequest('meets/', 'post', data);
  return resp;
};

export const appPutMeet = async (
  data: DataMeetForm,
  id: string,
): Promise<Meet | undefined> => {
  const resp = await appMeetsRequest(`meets/${id}`, 'put', data);
  return resp;
};

export const getFaticons = async (query: string): Promise<GetIcon> => {
  const {data} = await apiTask.get<GetIcon>(`faticon/${query}`);
  const {icon} = data;
  return {icon};
};
export const appFilesRequest = async (url: string) => {
  const {data} = await apiTask.get<FilesResponse>(url);
  if (data.error) {
    showToast(data.error);
    return;
  }
  return data.files;
};

export const appFilesPostRequest = async (
  id: string,
  file: FormData,
): Promise<File | undefined> => {
  const {data} = await apiTask.post<FileResponse>(`upload/file/${id}`, file);
  if (data.error) {
    showToast(data.error);
    return;
  }
  showToast('Archivo guardado');
  return data.file;
};

export const appFilesDeleteRequest = async (url: string): Promise<boolean> => {
  const {data} = await apiTask.delete<DefaultResponse>(url);
  if (data.error) {
    showToast(data.error);
    return false;
  }
  if (data.msg) {
    showToast(data.msg);
    return true;
  }
  return false;
};

export const appGetFolders = async (
  lesson: string,
): Promise<Folder[] | undefined> => {
  const {data} = await apiTask.get<GetFoldersResponse>(`folders/${lesson}`);
  if (data.error) {
    showToast(data.error);
    return;
  }
  return data.folders;
};

export const appPostFolder = async (
  id: string,
  folder: string,
): Promise<Folder | undefined> => {
  const dataPost = {folder};
  const {data} = await apiTask.post<FolderPostResponse>(
    `folders/${id}`,
    dataPost,
  );
  if (data.error) {
    showToast(data.error);
    return;
  }
  return data.folder;
};

export const appGetFilesByFolder = async (
  id: string,
): Promise<File[] | undefined> => {
  const {data} = await apiTask.get<FilesResponse>(`folders/folder/${id}`);
  if (data.error) {
    showToast(data.error);
    return;
  }
  return data.files;
};

export const appPostFileWithFolder = async (
  lesson: string,
  folder: string,
  file: FormData,
): Promise<File | undefined> => {
  const {data} = await apiTask.post<FileResponse>(
    `upload/file/${lesson}/${folder}`,
    file,
  );
  if (data.error) {
    showToast(data.error);
    return;
  }
  return data.file;
};

export const appUpdateFolder = async (url: string, filename: string) => {
  const {data} = await apiTask.put<FolderPostResponse>(url, {folder: filename});
  if (data.error) {
    showToast(data.error);
    return;
  }
  return data.folder;
};

export const appUpdateFile = async (id: string, filename: string) => {
  const file = {filename};
  const {data} = await apiTask.put<FileResponse>(`upload/file/${id}`, file);
  if (data.error) {
    showToast(data.error);
    return;
  }
  return data.file;
};
