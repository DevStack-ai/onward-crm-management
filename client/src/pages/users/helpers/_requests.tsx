import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/customers`;

export async function createuser(values: any) {
  return axios.post(`${baseUrl}/`, values);
}

export async function getUser(id: any) {
  return axios.get(`${baseUrl}/${id}`);
}

export async function updateUser(id: any, values: any) {
  return axios.put(`${baseUrl}/${id}`, values);
}

export async function approveUser(id: any, values: any) {
  return axios.post(`${baseUrl}/${id}/approve`, values);

}

export async function checkAvailable(field: string, paylaod: any) {
  return axios.post(`${baseUrl}/available/${field}`, { ...paylaod });
}


const baseContactUrl = `${import.meta.env.VITE_API_URL}/contacts`;

export async function createContact(values: any) {
  return axios.post(`${baseContactUrl}/`, values);
}

export async function getContact(id: any) {
  return axios.get(`${baseContactUrl}/${id}`);
}

export async function setAsDefaultContact(id: any) {
  return axios.put(`${baseContactUrl}/${id}/default`);
}

export async function updateContact(id: any, values: any) {
  return axios.put(`${baseContactUrl}/${id}`, values);
}

export async function deleteContact(id: any) {
  return axios.delete(`${baseContactUrl}/${id}`);
}

const baseAddressUrl = `${import.meta.env.VITE_API_URL}/addresses`;

export async function createAddress(values: any) {
  return axios.post(`${baseAddressUrl}/`, values);
}

export async function getAddress(id: any) {
  return axios.get(`${baseAddressUrl}/${id}`);
}

export async function setAsDefaultAddress(id: any) {
  return axios.put(`${baseAddressUrl}/${id}/default`);
}

export async function updateAddress(id: any, values: any) {
  return axios.put(`${baseAddressUrl}/${id}`, values);
}

export async function deleteAddress(id: any) {
  return axios.delete(`${baseAddressUrl}/${id}`);
}