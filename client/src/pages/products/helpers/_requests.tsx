import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/store/products`;

export async function create(values: any) {
  return axios.post(`${baseUrl}/create`, values);
}
export async function update(id: any, values: any) {
  return axios.put(`${baseUrl}/${id}`, values);
}
export async function get(id: any) {
  return axios.get(`${baseUrl}/${id}`);
}

export async function deleteItem(id: any) {
  return axios.delete(`${baseUrl}/${id}`);
}

export async function activateItem(id: any) {
  return axios.post(`${baseUrl}/${id}/activate`);
}


export async function approve(id: any, values: any) {
  return axios.post(`${baseUrl}/${id}/approve`, values);

}

export async function checkAvailable(field: string, paylaod: any) {
  return axios.post(`${baseUrl}/available/${field}`, { ...paylaod });
}

