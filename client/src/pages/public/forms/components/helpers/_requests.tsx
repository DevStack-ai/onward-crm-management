import axios from 'axios';

const base = import.meta.env.VITE_API_URL

export const createCustomer = async (data: any) => {
    try {
        const res = await axios.post(`${base}/customers`, data)
        return res.data
    } catch (error) {
        throw error
    }
}