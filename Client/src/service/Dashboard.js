import apiClient from "../api/apiClient";

export const getDashboardData = () => {
    return apiClient.get("/dashboard");
}   