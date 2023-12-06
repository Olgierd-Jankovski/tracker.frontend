import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import { useSelector } from 'react-redux';
import './App.css';


const App = () => {
  const { isLoggedIn } = useSelector(state => state.authenticationReducer);

  return <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <HomePage /> : <SignInPage />}
      />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/" /> : <SignUpPage />}
      />
      <Route
        path="/signin"
        element={isLoggedIn ? <Navigate to="/" /> : <SignInPage />}
      />
      <Route
        path="/*"
        element={<h2>Page not found!</h2>}
      />
    </Routes>
  </BrowserRouter>
}
export default App;
