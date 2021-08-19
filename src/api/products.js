import axios from '@/axios';

export default {
  products(params) {
    return axios.get('/products/all', { params });
  },
  productRemove(params) {
    console.log(params);
    return axios.delete(`/products/${params.id}`);
  },
};
