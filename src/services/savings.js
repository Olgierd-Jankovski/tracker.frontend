import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Savings`,
})

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token');
    return config;
})

export const CreateSaving = async (saving) => {
    try {
        // check is the amount equal to 'N/A'
        if (saving.amount === 'N/A' || saving.amount <= 0) {
            console.log("Saving amount is N/A or less than 0");
            return;
        }
        const { data } = await axiosInstance.post('/', saving);
        return data;
    }
    catch (error) {
        console.log("Error in CreateSaving: ", error);
    }
}