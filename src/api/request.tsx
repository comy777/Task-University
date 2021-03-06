import { apiTask } from './config';
import { AuthResponse, DeleteResponse, GetResponse, SaveTaskResponse, UserResponse } from '../interfaces/response';
import { DataAuth, DataLessonSave, DataNoteSave, DataTaskSave, DataUserSave } from '../interfaces/data';
import { saveData } from '../utils/storage';
import { showToast } from '../utils/toast';
import { Note, Task } from '../interfaces/response';
import { Lesson } from '../interfaces/response';

export const authRequest = async (url: string, data: DataAuth) => {
	const resp = await apiTask.post<AuthResponse>(url, data);
	if (resp.data.error) {
		showToast(resp.data.error);
		return false;
	}
	const { token } = resp.data;
	saveData('token', token);
	return token;
};

export const authUserRequest = async (method: string, data?: DataUserSave) => {
	const request =
		method === 'get' ? await apiTask.get<UserResponse>('auth') : await apiTask.put<UserResponse>('auth', data);
	const resp = request;
	if (resp.data.error) {
		showToast(resp.data.error);
		return false;
	}
	const { user } = resp.data;
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
	const { lessons } = await appGetRequest(url);
	return lessons;
};

export const appGetNotes = async (url: string) => {
	const { notes } = await appGetRequest(url);
	return notes;
};

export const appGetTasks = async (url: string) => {
	const { tasks } = await appGetRequest(url);
	return tasks;
};

export const appPostRequest = async (url: string, data: DataLessonSave | DataNoteSave | DataTaskSave) => {
	const resp = await apiTask.post(url, data);
	if (resp.data.error) {
		showToast(resp.data.error);
		return false;
	}
	return resp.data;
};

export const appPostLessons = async (url: string, data: DataLessonSave): Promise<Lesson> => {
	const { lesson } = await appPostRequest(url, data);
	return lesson;
};

export const appPostNotes = async (url: string, data: DataNoteSave): Promise<Note> => {
	const { note } = await appPostRequest(url, data);
	return note;
};

export const appPostTasks = async (url: string, data: DataTaskSave): Promise<Task> => {
	const { task } = await appPostRequest(url, data);
	return task;
};

export const appPutRequest = async (url: string, data: DataLessonSave | DataNoteSave | DataTaskSave) => {
	const resp = await apiTask.put(url, data);
	if (resp.data.error) {
		showToast(resp.data.error);
		return false;
	}
	return resp.data;
};

export const appPutLessons = async (url: string, data: DataLessonSave): Promise<Lesson> => {
	const { lesson } = await appPutRequest(url, data);
	return lesson;
};

export const appPutNotes = async (url: string, data: DataNoteSave): Promise<Note> => {
	const { note } = await appPutRequest(url, data);
	return note;
};

export const appPutTasks = async (url: string, data: DataTaskSave): Promise<Task> => {
	const { task } = await appPutRequest(url, data);
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
