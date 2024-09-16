import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/profiles`;

export async function createProfile(values: any) {
  return axios.post(`${baseUrl}/create`, values);
}

export async function getProfile(id: any) {
  return axios.get(`${baseUrl}/details/${id}`);
}


export async function updateProfile(id: any, values: any) {
  return axios.put(`${baseUrl}/edit/${id}`, values);
}