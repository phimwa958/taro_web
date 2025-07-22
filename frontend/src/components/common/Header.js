
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AuthService from '../../services/authService';

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate('/');
  };

  return (
    <nav>
      <div>
        <Link to={'/'}>Home</Link>
      </div>

      {currentUser ? (
        <div>
          <Link to={'/dashboard'}>Dashboard</Link>
          <Link to={'/tarot'}>Tarot</Link>
          <a href='/login' onClick={logOut}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
