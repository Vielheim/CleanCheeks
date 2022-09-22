import React from 'react';

import { Link } from 'react-router-dom';

import styles from './LoginButton.module.scss';

const LoginButton = () => {
  return (
    <Link to="/">
      <button className={styles['login-button']}>Sign in to view</button>
    </Link>
  );
};

export default LoginButton;
