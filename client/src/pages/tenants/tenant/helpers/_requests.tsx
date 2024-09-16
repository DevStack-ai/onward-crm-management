import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/tenant`;

export async function create(values: any) {
  return axios.post(`${baseUrl}/`, values);
}

export async function get(id: any) {
  return axios.get(`${baseUrl}/${id}`);
}

export async function update(id: any, values: any) {
  return axios.put(`${baseUrl}/${id}`, values);
}

export async function suspend(id: string) {
  return axios.delete(`${baseUrl}/${id}/suspend`);
}

export async function getCompanies(id: string) {
  return axios.get(`${baseUrl}/${id}/companies`);
}