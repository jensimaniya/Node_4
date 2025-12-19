import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const getProducts = () => axios.get(API_URL);
export const addProduct = (formData) =>
  axios.post(API_URL, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateProduct = (id, formData) =>
  axios.put(`${API_URL}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
