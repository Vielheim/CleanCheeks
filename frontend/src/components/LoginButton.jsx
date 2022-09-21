import React from 'react';
import { Link } from 'react-router-dom';
import './LoginButton.scss';

const LoginButton = () => {
  return (
    <Link to="/">
      <button className="login-button">Login</button>
    </Link>
  );
};

export default LoginButton;
