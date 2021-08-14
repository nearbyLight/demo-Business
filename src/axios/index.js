import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => {
  console.log(config);
  return config;
}, (error) => Promise.reject(error));

instance.interceptors.response.use((responsed) => {
  console.log(responsed);
  if (responsed.data.status === 'fail') {
    return Promise.reject(responsed.data.msg);
  }
  return responsed.data.data;
}, (error) => Promise.reject(error));

export default instance;
