import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Expenses`,
})

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token');
    return config;
})

export const CreateExpense = async (expense) => {
    try {
        if(expense.amount === 0) {
            console.log("Expense amount is 0");
            return;
        }
        const { data } = await axiosInstance.post('/', expense);
        return data;
    }
    catch {
        console.log("Error in CreateExpense");
    }
}