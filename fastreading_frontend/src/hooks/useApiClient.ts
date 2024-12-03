import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const useApiClient = () =>{
    
    const getAuthHeader = ()=>{
        const token = localStorage.getItem('token');
        return token? `Bearer ${token}`:"";
    }

    const apiClient = axios.create({
        baseURL: API_BASE_URL,
        withCredentials: false,
    });

    apiClient.interceptors.request.use((config)=>{
        const authHeader = getAuthHeader();
        config.headers.Authorization = authHeader;
        console.log("HEADERS: ", config.headers)
        return config;
    });

    apiClient.interceptors.response.use((response)=>{
        console.log("Response in useapi: ",response)
        return response;
    }, (error)=>{
        console.log(error.response.data)
        return error
    })

    return apiClient;
}