import axios from 'axios';
import store from '../store';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => {
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.user.appkey,
    },
  };
}, (error) => Promise.reject(error));

instance.interceptors.response.use((responsed) => {
  if (responsed.data.status === 'fail') {
    return Promise.reject(responsed.data.msg);
  }
  return responsed.data.data;
}, (error) => Promise.reject(error));

export default instance;
