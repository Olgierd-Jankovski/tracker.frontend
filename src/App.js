import { useEffect } from 'react';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import Navbar from './components/NavBar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import FillUpPage from './components/FillUpPage';
import StatisticsPage from './components/StatisticsPage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ActionCreators } from './redux/authenticationReducer';

import './App.css';

// Destructure the specific action creator to avoid necessary imports
const { userAuthenticated } = ActionCreators;

const App = () => {
  const { isLoggedIn } = useSelector(state => state.authenticationReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token !== undefined && token !== null) {
      dispatch(userAuthenticated({ token }));
    }
  }, [])

  return <BrowserRouter>
    <Navbar />
    <Routes>
      <Route
        path='/'
        element={isLoggedIn ? <HomePage /> : <SignInPage />}
      />
      <Route
        path='/signup'
        element={isLoggedIn ? <Navigate to='/' /> : <SignUpPage />}
      />
      <Route
        path='/signin'
        element={isLoggedIn ? <Navigate to='/' /> : <SignInPage />}
      />
      <Route
        path='/fill-up'
        element={isLoggedIn ? <FillUpPage /> : <SignInPage />}
      />
      <Route
        path='/statistics'
        element={isLoggedIn ?<StatisticsPage /> : <SignInPage />}
      />

      <Route
        path='/*'
        element={<h2>Page not found!</h2>}
      />
    </Routes>
  </BrowserRouter>
}
export default App;
