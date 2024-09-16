import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/company`;

export async function notIn(id: string) {
    return axios.get(`${baseUrl}/not-in/${id}`);
}

export async function assignAccountant(companyId: string, accountantId: string) {
    return axios.post(`${baseUrl}/assign`, { companyId, accountantId });
}

export async function unassignAccountant(companyId: string, accountantId: string) {
    return axios.post(`${baseUrl}/unassign`, { companyId, accountantId });
}