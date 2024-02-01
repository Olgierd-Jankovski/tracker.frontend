const handleSuccessfulResponse = (response, setError) => {
    if (response.data) {
        // Successful login
        setError(null);
    }
    else {
        // handle other scenarios, e.g. display a custom message from the server
        setError(response.data?.message || 'Unexpected error occurred.');
    }
}

export default handleSuccessfulResponse;