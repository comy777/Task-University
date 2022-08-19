import axios from 'axios';
import {getData} from '../utils/storage';

const baseURL = 'https://task-university.herokuapp.com/';

const localhost = 'http://192.168.100.4:5050/';

export const apiTask = axios.create({
  baseURL,
});

apiTask.interceptors.request.use(async config => {
  const token = await getData('token');
  if (token) {
    //config.headers['x-token'] = token;
    config.headers['authorization'] = token;
  }
  return config;
});
