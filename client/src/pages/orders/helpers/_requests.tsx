import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/orders`;



export async function getOrder(id: any) {
  return axios.get(`${baseUrl}/${id}`);
}

export async function updateOrder(id: any, values: any) {
  return axios.put(`${baseUrl}/${id}`, values);
}

export async function approveOrder(id: any, values: any) {
  return axios.post(`${baseUrl}/${id}/approve`, values);
}

export async function rejectOrder(id: any, values: any) {
  return axios.post(`${baseUrl}/${id}/reject`, values);
}
