import apiClient from "../api/apiClient";

export const latestOrder = async() => {
    return await apiClient.get(`/orders/latest`);
} 

export const createOrder = async(order) => {
    return await apiClient.post(`/orders`, order);
}

export const deleteOrder = async(orderId) => {
    return await apiClient.delete(`/orders/${orderId}`);
}   