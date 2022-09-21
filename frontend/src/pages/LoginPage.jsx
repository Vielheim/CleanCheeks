import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/satisfied.png';
import { MdArrowRight } from 'react-icons/md';
import GoogleAuth from '../components/auth/GoogleAuth';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <div className={styles['login-container']}>
      <img className={styles['login-logo']} src={logo} alt="logo"></img>
      <h2 className={styles['login-title']}>welcome to cleancheeks</h2>
      <GoogleAuth />
      <div className={styles['divider']}>
        <hr className={styles['divider-line']} />
        or
        <hr className={styles['divider-line']} />
      </div>
      <Link to="/home" className={styles['continue-text']}>
        Continue without logging in
        <MdArrowRight />
      </Link>
    </div>
  );
};

export default LoginPage;
