import axios from 'axios';

const API_URL = 'http://localhost:8081/api/v1/store';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getStores = async () => {
    try {
        const response = await axiosInstance.get('/');
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the stores!', error);
        throw error;
    }
};

export const getStoreById = async (id) => {
    try {
        const response = await axiosInstance.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching store with id ${id}:`, error);
        throw error;
    }
}

export const createStore = async (store) => {
    try {
        const response = await axiosInstance.post('/', store);
        return response.data;
    } catch (error) {
        console.error('Error creating store:', error);
        throw error;
    }
};

export const deleteStore = async (id) => {
    try {
        await axiosInstance.delete(`/${id}`);
        return true;
    } catch (error) {
        console.error(`Error deleting store with id ${id}:`, error);
        throw error;
    }
};

export const updateStock = async (productId, storeId, stockQty) => {
    try {
        console.log('Updating stock for product', productId, 'in store', storeId, 'to', stockQty);
        const response = await axiosInstance.post('/update-stock', {
            productId,
            storeId,
            stockQty,
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating stock for product ${productId} in store ${storeId}:`, error);
        throw error;
    }
}
