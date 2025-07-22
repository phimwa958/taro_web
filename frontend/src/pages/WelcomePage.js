import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const WelcomePage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to Tarot Web!</h1>
      <p>Discover insights and guidance through the wisdom of Tarot.</p>
      {currentUser ? (
        <p>
          You are logged in! Get your personalized <Link to="/tarot">Tarot reading</Link> now.
        </p>
      ) : (
        <p>
          Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to get your personalized Tarot reading.
        </p>
      )}
    </div>
  );
};

export default WelcomePage;