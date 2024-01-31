import axios from 'axios';
import { ActionCreators } from '../redux/authenticationReducer';

// Destructure the specific action creator to avoid necessary imports
const { userAuthenticated } = ActionCreators;

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Authentication`,
});

export const SignUp = async (dispatch, credentials) => {
    try {
        const { data } = await axiosInstance.post('/signup', credentials);
        dispatch(userAuthenticated(data));
    }
    catch (error) {
        console.log("Error in SignUp:" + error);

        // Re-throw the error to be handled in the component
        throw error;
    }
}

export const SignIn = async (dispatch, credentials) => {
    try {
        const { data } = await axiosInstance.post('/signin', credentials);
        dispatch(userAuthenticated(data));

        // Return the entire response object to handle in the component
    }
    catch (error) {
        console.log("Error in SignIn: " + error);

        // Re-throw the error to be handled in the component
        throw error;
    }
}