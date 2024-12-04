import axios from "axios";
import moment from "moment";

const baseUrl = `${import.meta.env.VITE_API_URL}/store/products`;

export async function create(values: any) {
  const form = new FormData();

  for (const key in values) {

    if (values.hasOwnProperty(key)) {
      form.append(key, values[key]);
    }
  }
  return axios.post(`${baseUrl}/create`, form);
}
export async function update(id: any, values: any) {

  const form = new FormData();

  for (const key in values) {

    if (values.hasOwnProperty(key)) {
      form.append(key, values[key]);
    }
  }

  return axios.put(`${baseUrl}/${id}`, form);
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

export async function getFile(idproduct: number, type: string){
  return axios.get(`${baseUrl}/image?product=${idproduct}&type=${type}`, {responseType: 'blob'});

}

export async function approve(id: any, values: any) {
  return axios.post(`${baseUrl}/${id}/approve`, values);

}

export async function checkAvailable(field: string, paylaod: any) {
  return axios.post(`${baseUrl}/available/${field}`, { ...paylaod });
}



export async function downloadProducts(filters: any) {
  const query = await axios.post(`${baseUrl}/export`, { filters }, { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([query.data]));
  const link = document.createElement("a");
  const date = moment().format("DDMMYYYYHHmm")
  link.setAttribute("href", url);
  link.setAttribute("download", `Productos${date}.xlsx`);
  link.click();

}


export async function loadFile(file: File, name: string) {
  const form = new FormData();
  form.append('file', file, name);
  return axios.post(`${baseUrl}/load-file`, form);
}