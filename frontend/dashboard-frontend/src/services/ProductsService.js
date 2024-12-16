import axios from 'axios';

const API_URL = 'http://localhost:8081/api/v1/product';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/');
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the products!', error);
        throw error;
    }
};

export const createProduct = async (product) => {
    try {
        const response = await axiosInstance.post('/', product);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axiosInstance.delete(`/${id}`);
        return true;
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
};

export const getUOM = async () => {
    try {
        const response = await axiosInstance.get('/uom');
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the UOM!', error);
        throw error;
    }
};

export const getProductsNotInStore = async (storeId) => {
    try {
        const response = await axiosInstance.get(`/notInStore/${storeId}`);
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the products not in store!', error);
        throw error;
    }
};
