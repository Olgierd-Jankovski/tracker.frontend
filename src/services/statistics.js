import axios from 'axios';
import { ActionCreators } from '../redux/statisticsReducer';

// Destructor the specific action creator to avoid necessary imports
const {setExpenseAmountPerCategory, setSavingAmountPerCategory} = ActionCreators;

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/statistics`
});

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token');
    return config;
});

export const getExpensesPerCategory = async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('/expenses');
        console.log("expenses....: ");
        dispatch(setExpenseAmountPerCategory(data));

    } catch (error) {
        console.log("Error in getExpensesPerCategory: ", error);
    }
}

export const getSavingsPerCategory = async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('/savings');
        console.log("savings....: ");
        dispatch(setSavingAmountPerCategory(data));

    } catch (error) {
        console.log("Error in getSavingsPerCategory: ", error);
    }
}

