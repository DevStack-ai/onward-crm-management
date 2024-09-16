import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/branchs`;

export async function create(values: any) {
  return axios.post(`${baseUrl}/create`, values);
}

export async function get(id: any) {
  return axios.get(`${baseUrl}/details/${id}`);
}


export async function update(id: any, values: any) {
  return axios.put(`${baseUrl}/edit/${id}`, values);
}