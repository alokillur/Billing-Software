import axios from "axios";

export const loginService = async (data) => {
    return await axios.post('http://localhost:8080/api/v1.0/login', data);
}