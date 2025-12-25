import apiClient from "../api/apiClient";

export const createRazorpayOrder = async(payment) => {
    return await apiClient.post(`/payments/create-order`, payment);
}

export const verifyPayment = async(payment) => {
    return await apiClient.post(`/payments/verify`, payment);
}