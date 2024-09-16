import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/providers`;

export async function create(values: any) {
  return axios.post(`${baseUrl}/create`, values);
}

export async function get(id: any) {
  return axios.get(`${baseUrl}/details/${id}`);
}


export async function update(id: any, values: any) {
  return axios.put(`${baseUrl}/edit/${id}`, values);
}

export async function checkAvailable(field: string, paylaod: any) {
  return axios.post(`${baseUrl}/available/${field}`, { ...paylaod });
}

export async function deleteProvider(id: string) {
  return axios.delete(`${baseUrl}/delete/${id}`);
}