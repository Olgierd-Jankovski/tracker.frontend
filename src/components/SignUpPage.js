import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SignUp } from '../services/authentication';
import handleApiError from '../utils/responseHandling/apiErrorHandling';
import handleSuccessfulResponse from '../utils/responseHandling/successfulResponseHandling';
import { Form, Button, FormControl, InputGroup, Spinner, Alert } from 'react-bootstrap';

const SignUpPage = () => {
    const [credentialsData, setCredentialsData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCredentialsData(prevData => ({ ...prevData, [name]: value }));
    }

    const handleSignUp = async event => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await SignUp(dispatch, { name: credentialsData.username, email: credentialsData.email, password: credentialsData.password });
            handleSuccessfulResponse(response, setError);

            // Reset form and clear error on success
            setCredentialsData({ username: '', email: '', password: '', confirmPassword: '' });
            setError(null);
        }
        catch (error) {
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    }

    return <div style={{ width: '30rem', margin: 'auto', paddingTop: '8px' }}>
        <Form onSubmit={handleSignUp}>
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
                    name='email'
                    placeholder='Email'
                    onChange={handleInputChange}
                    value={credentialsData.email}
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
            <InputGroup className='mb-3'>
                <FormControl
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    type='password'
                    onChange={handleInputChange}
                    value={credentialsData.confirmPassword}
                ></FormControl>
            </InputGroup>
            <Button
                type='submit'
                variant='success'
                style={{ margin: 'auto', display: 'block', width: '10rem' }}
                disabled={loading || (credentialsData.password !== credentialsData.confirmPassword || credentialsData.password.length <= 0)}
            >
                {loading ? <Spinner animations='border' size='sm' /> : 'Sign Up'}
            </Button>

            {error && <Alert variant='danger' style={{ marginTop: '10px' }}>{error}</Alert>}
        </Form>
    </div>
}

export default SignUpPage;