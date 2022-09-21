import React from 'react';

import { Link } from 'react-router-dom';

import './LoginButton.scss';

const LoginButton = () => {
  return (
    <Link to="/">
      <button className="login-button">Log in to view</button>
    </Link>
  );
};

export default LoginButton;
