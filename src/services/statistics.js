import axios from 'axios';
import { ActionCreators } from '../redux/statisticsReducer';

// Destructor the specific action creator to avoid necessary imports
const {setExpenseAmountPerCategory} = ActionCreators;

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/statistics`
});

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token');
    return config;
});

export const getExpensesPerCategory = async (dispatch) => {
    try {
        const { data } = await axiosInstance.get();
        dispatch(setExpenseAmountPerCategory(data));

    } catch (error) {
        console.log("Error in getExpensesPerCategory: ", error);
    }
}

