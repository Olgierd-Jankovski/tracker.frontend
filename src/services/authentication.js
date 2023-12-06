import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Authentication`,
});

export const SignUp = async (dispatch, credentials) => {
    try {
        const { data } = await axiosInstance.post('/signup', credentials);
        dispatch(userAuthenticated(data));
    }
    catch {
        console.log("Error in SignUp");
    }
}

export const SignIn = async (dispatch, credentials) => {
    try {
        const{data} = await axiosInstance.post('/signin', credentials);
        dispatch(userAuthenticated(data));

    }
    catch {
        console.log("Error in SignIn");
    }
}