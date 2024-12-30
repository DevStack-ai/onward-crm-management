import axios from "axios";
import moment from "moment";

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


export async function addOrder(id: number, articulo: number) {
  return axios.post(`${orderUrl}/add`, { ord_codigo: id, art_codigo: articulo });
}

export async function deleteOrder(id: number, articulo: number) {
  return axios.post(`${orderUrl}/delete`, { ord_codigo: id, art_codigo: articulo });
}

export async function sentOrder(id: number) {
  return axios.post(`${orderUrl}/sent`, { ord_codigo: id });
}

export async function rejectOrder(id: number) {
  return axios.post(`${orderUrl}/reject`, { ord_codigo: id });
}

export async function approveOrder(id: number) {
  return axios.post(`${orderUrl}/approve`, { ord_codigo: id });
}

export async function downloadOrder(id: number, type: string) {
  const query = await axios.post(`${orderUrl}/download`, { ord_codigo: id, fileType: type }, { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([query.data]));
  const link = document.createElement("a");
  const date = moment().format("DDMMYYYYHHmm")
  link.setAttribute("href", url);
  link.setAttribute("download", `${id}Orden${date}.${type}`);
  link.click();
}

export async function updateCosto(orden: number, costo: number, valor: number) {
  return axios.put(`${orderUrl}/costo`, { ord_codigo: orden, cos_costo: costo, valor: valor });
}