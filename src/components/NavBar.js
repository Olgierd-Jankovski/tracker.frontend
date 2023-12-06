import { useSelector, useDispatch } from 'react-redux';
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
                <Button variant='link' href='/signin' onClick={() => dispatch(logout())}> Log out</Button>
                :
                <div style={{ display: 'flex' }}>
                    <NavLink to='/signup'>Sign Up</NavLink>
                    <NavLink to='/signin' style={{ marginLeft: '1rem' }}>Sign In</NavLink>
                </div>
        }

    </Nav >
}

export default Navbar;