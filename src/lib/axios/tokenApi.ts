import axios from "axios";

console.log("base url: ", import.meta.env.VITE_BASE_URL);


const tokenApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export default tokenApi;