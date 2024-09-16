import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export async function createuser(values: any) {
  return axios.post(`${baseUrl}/create`, values);
}

export async function getUser(id: any) {
  return axios.get(`${baseUrl}/details/${id}`);
}

export async function updateUser(id: any, values: any) {
  return axios.put(`${baseUrl}/edit/${id}`, values);
}

export async function checkAvailable(field: string, paylaod: any) {
  return axios.post(`${baseUrl}/available/${field}`, { ...paylaod });
}
