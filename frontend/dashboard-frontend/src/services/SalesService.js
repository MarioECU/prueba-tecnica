import axios from 'axios';

const API_URL = 'http://localhost:8081/api/v1/sales';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const addSales = async (productId, storeId, salesQty) => {
    try {
        const response = await axiosInstance.post('/', {
            productId,
            storeId,
            salesQty            
        });
        return response.data;
    } catch (error) {
        console.error('Error creating sales:', error);
        throw error;
    }
}
