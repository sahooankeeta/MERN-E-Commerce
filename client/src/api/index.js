import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});
API.interceptors.response.use(
    function (response) {
      
      return response.data;
    },
    function (error) {
      console.log("erorr",error.response.data)
      return error.response.data
    }
  );
export const signIn = (formData) => API.post('/users/login', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const getProducts=({page,limit,filterQuery})=>API.get(`/products?page=${page}&limit=${limit}&${filterQuery}`);
export const getProduct=(id)=>API.get(`/products/${id}`)
export const addProduct=(formData) => API.post('/products', formData)
export const editProduct=(formData,id) => API.patch(`/products/${id}`, formData)
export const removeProduct=(id) => API.delete(`/products/${id}`)
export const getCart=()=>API.get(`/cart`)
export const addToCart=(cartData)=>API.post(`/cart/add`,cartData)
export const removeFromCart=(cartItemId)=>API.delete(`/cart/remove/${cartItemId}`)
export const updateCart=(data)=>API.patch(`/cart/update`,data)
export const createOrder=(data)=>API.post('/orders/payment/create-order',data)
export const verifyOrder=(data)=>API.post('/orders/payment/verify-order',data)
export const getAllOrders=()=>API.get('/orders/all')
export const getOrder=(id)=>API.get(`/orders/${id}`)