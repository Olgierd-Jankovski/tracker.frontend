import { useSelector, useDispatch } from 'react-redux';
import NotificationContainer from './NotificationContainer.tsx'
import { Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ActionCreators } from '../redux/authenticationReducer';

// Destructure the specific action creator to avoid necessary imports
const { logout } = ActionCreators;


const Navbar = () => {
    const { isLoggedIn } = useSelector(state => state.authenticationReducer);
    const dispatch = useDispatch();

    return <Nav className='navbar' style={{ backgroundColor: '#e4fff2' }}>
        <h1 style={{ fontFamily: 'cursive', fontSize: '50px', color: '#000000' }}></h1>
        {
            isLoggedIn
                ?

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <NavLink style={{ marginLeft: '1rem' }} variant='link' to='/'>Home</NavLink>
                    <NavLink style={{ marginLeft: '1rem' }} variant='link' to='/statistics'>Statistics</NavLink>
                    <NavLink style={{ marginLeft: '1rem' }} variant='link' to='/fill-up'>Fill Up</NavLink>
                    <Button variant='link' href='/signin' onClick={() => dispatch(logout())}> Log out</Button>
                    <NotificationContainer />
                </div>

                :
                
                <div style={{ display: 'flex' }}>
                    <NavLink to='/signup'>Sign Up</NavLink>
                    <NavLink to='/signin' style={{ marginLeft: '1rem' }}>Sign In</NavLink>
                </div>
        }

    </Nav >
}

export default Navbar;