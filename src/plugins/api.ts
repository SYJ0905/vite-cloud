import axios from 'axios';
import { LOGIN_TOKEN } from './cookies';

// const url = window.location;
const API_PATH = 'https://python-message-board-fast-api.onrender.com';
// const API_PATH = 'https://python-message-board-api.onrender.com';
// const API_PATH = ['localhost'].some(a => url.origin.includes(a)) ? import.meta.env.VITE_API_PATH : `${url.origin}`;

function baseAxios(baseURL: string, setting?: object) {
  const baseReq = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Authorization': `Bearer ${LOGIN_TOKEN.get()}`,
    },
    ...setting,
  });
  baseReq.interceptors.request.use((config) => {
    if (config.headers
      && config.headers.Authorization)
      config.headers.Authorization = `Bearer ${LOGIN_TOKEN.get()}`;

    return config;
  });
  baseReq.interceptors.response.use(
    response => response,
    async (error) => {
      const { code } = error;
      if (code === 'ERR_NETWORK') {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        // const response = await API_GET_USER();
        // if (!response) {
        //   return Promise.reject(new Error('ERR_NETWORK'));
        // }
        return Promise.reject(new Error('ERR_NETWORK'));
      }

      const { status, statusText, data } = error.response;
      const errorMessage = `${data.msg || data.message || statusText}`;
      let text = '';
      if (errorMessage === 'Could not validate credentials')
        return;
      switch (status) {
        case 403:
          text = '您的帳號無此項操作權限';
          break;
        case 404:
          text = '頁面不存在';
          break;
        case 500:
          text = '程式發生問題';
          break;
        default:
          text = errorMessage;
      }
      return Promise.reject(new Error(text));
    },
  );
  return baseReq;
}

const apiRequest = baseAxios(`${API_PATH}`);

export const API_GET_ROOT = () => apiRequest.get('/', );
export const API_GET_ROOT_INFO = () => apiRequest.get('/info', );

export const API_POST_REGISTER = (data) => apiRequest.post('/user', data);
export const API_POST_LOGIN = (data) => apiRequest.post('/auth/login', data);

export const API_GET_USER_DETAIL = (id) => apiRequest.get(`/user/${id}`);
// export const API_UPDATE_USER_DETAIL = (id) => apiRequest.put(`/user/${id}`);
// export const API_DELETE_USER_DETAIL = (id) => apiRequest.delete(`/user/${id}`);

export const API_GET_USERLIST = () => apiRequest.get('/users');

export const API_GET_MESSAGES = () => apiRequest.get('/messages');
export const API_POST_MESSAGE = (data) => apiRequest.post('/message', data);
export const API_UPDATE_MESSAGE = (data) => apiRequest.put(`/message/${data.message_id}`, data);
export const API_DELETE_MESSAGE = (message_id) => apiRequest.delete(`/message/${message_id}`);

export const API_POST_REPLY_MESSAGE = (data) => apiRequest.post('/reply', data);
export const API_UPDATE_REPLY_MESSAGE = (reply_id, data) => apiRequest.put(`/reply/${reply_id}`, data);
export const API_DELETE_REPLY_MESSAGE = (reply_id) => apiRequest.delete(`/reply/${reply_id}`);


