import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7242/Types',
})

export const getTypeNameById = async (TypeId) => {
    try{
        const response = await axiosInstance.get(`/${TypeId}`);
        return response.data.name;
    }
    catch{
        console.log("Error in getTypeNameById");
    }
}

export const getTypes = async () => {
    try{
        const response = await axiosInstance.get();
        return response.data;
    }
    catch{
        console.log("Error in GetTypes");
    }
}