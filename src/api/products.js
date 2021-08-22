import axios from '@/axios';

export default {
  products(params) {
    return axios.get('/products/all', { params });
  },
  productRemove(params) {
    console.log(params);
    return axios.delete(`/products/${params.id}`);
  },
  add(params) {
    return axios.post('/products/add', params);
  },
  detail(params) {
    return axios.get(`/products/${params}`);
  },
  edit(params) {
    return axios.put('/products/edit', params);
  },
};
