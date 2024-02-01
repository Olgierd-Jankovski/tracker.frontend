const handleApiError = (error, setError) => {
    if (error.response) {
        // The request was made and the server responded with the status code
        if (error.response.status === 401) {
            // Invalid username/password
            setError(error.response.data || 'Invalid username or password. Please try again.');
        }
        else if(error.response.status === 409)
        {
            // Account already exists
            setError(error.response.data || 'Account already exists with passed credentials');
        }
        else {
            // Other server errors
            setError('Server error. Please try again later.');
        }
    }
    else if (error.request) {
        // Request was made but no response was recevied
        setError('Server is offline. Please try again later.');
    }
    else {
        // Something happened in setting up the request that triggered an error
        setError('Error occurred. Please try again.');
    }
};

export default handleApiError;