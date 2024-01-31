import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SignIn } from '../services/authentication';
import  handleApiError  from '../utils/responseHandling/apiErrorHandling';
import  handleSuccessfulResponse  from '../utils/responseHandling/successfulResponseHandling';
import { Form, Button, FormControl, InputGroup, Spinner, Alert } from 'react-bootstrap';

const SignInPage = () => {
    const [credentialsData, setCredentialsData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCredentialsData(prevData => ({ ...prevData, [name]: value }));
    }

    const handleSignIn = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await SignIn(dispatch, { name: credentialsData.username, password: credentialsData.password, email: '' })
            handleSuccessfulResponse(response, setError);
            // Reset form and clear error on success

            setCredentialsData({ username: '', password: '' });
            setError(null);

        } catch (error) {
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    return <div style={{ width: '30rem', margin: 'auto', paddingTop: '8px' }}>
        <Form onSubmit={handleSignIn}>
            <h4 style={{ textAlign: 'center' }}>Welcome back</h4>
            <InputGroup className='mb-3'>
                <FormControl
                    name='username'
                    placeholder='Username'
                    onChange={handleInputChange}
                    value={credentialsData.username}
                ></FormControl>
            </InputGroup>
            <InputGroup className='mb-3'>
                <FormControl
                    name='password'
                    placeholder='Password'
                    type='password'
                    onChange={handleInputChange}
                    value={credentialsData.password}
                ></FormControl>
            </InputGroup>
            <Button
                type='submit'
                variant='primary'
                style={{ margin: 'auto', display: 'block', width: '10rem' }}
                disabled={loading}
            >
                {loading ? <Spinner animation='border' size='sm' /> : 'Sign in'}
            </Button>

            {error && <Alert variant='danger' style={{ marginTop: '10px' }}>{error}</Alert>}
        </Form>
    </div >
}

export default SignInPage;