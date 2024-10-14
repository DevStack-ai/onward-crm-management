import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/store/products`;

export async function getProducts(filter: string, offset: number = 0) {
  return axios.post(`${baseUrl}`, { offset, filter });
}


const cartUrl = `${import.meta.env.VITE_API_URL}/store/cart`;

export async function getCart(cliente: number) {
  return axios.post(`${cartUrl}`, { cliente });
}

export async function addCart(articulo: number, cantidad: number, cliente: number, update: boolean = false) {
  return axios.post(`${cartUrl}/add`, { articulo, cantidad, cliente, replace: update });
}

export async function updateCart(id: number, cantidad: number) {
  return axios.post(`${cartUrl}/update`, { id, cantidad });
}

export async function deleteCart(id: number) {
  return axios.post(`${cartUrl}/delete`, { codigo: id });
}

export async function deleteAllCart(cliente: number) {
  return axios.post(`${cartUrl}/deleteAll`, { cliente });
}

export async function getCartCount(cliente: number) {
  return axios.post(`${cartUrl}/count`, { cliente });
}


const orderUrl = `${import.meta.env.VITE_API_URL}/store/order`;

export async function createOrder(cliente: number) {
  return axios.post(`${orderUrl}`, { cliente });
}