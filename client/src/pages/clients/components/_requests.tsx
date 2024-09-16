import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/accountants`;

export async function notIn(id: string) {
    return axios.get(`${baseUrl}/not-in/${id}`);
}

export async function assignAccountant(companyId: string, accountantId: string) {
    return axios.post(`${baseUrl}/assign`, { companyId, accountantId });
}

export async function unassignAccountant(companyId: string, accountantId: string) {
    return axios.post(`${baseUrl}/unassign`, { companyId, accountantId });
}

export async function importAccounts(fromCompanyId: string, toCompanyId: string) {
    return axios.post(`${import.meta.env.VITE_API_URL}/accounting-accounts/import`, {
        sourceCompany: fromCompanyId,
        targetCompany: toCompanyId
    });
}