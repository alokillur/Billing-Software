import apiClient from "../api/apiClient";

export const loginService = async (data) => {
    return await apiClient.post('/login', data);
}