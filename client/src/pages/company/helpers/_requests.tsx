import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/company`;

export async function createCompany(values: any) {
  return axios.post(`${baseUrl}/create`, values);
}

export async function getCompany(id: any) {
  return axios.get(`${baseUrl}/details/${id}`);
}


export async function updateCompany(id: any, values: any) {
  return axios.put(`${baseUrl}/edit/${id}`, values);
}