import get from 'lodash/get';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://6088e20da6f4a300174271e7.mockapi.io/',
});

api.interceptors.response.use(
  (response: any) => response,
  (error: { message: any }) => {
    const err = get(error, ['response', 'data', 'err']);

    return Promise.reject(err || error.message);
  }
);

export default api;
