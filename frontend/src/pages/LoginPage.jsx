import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { MdArrowRight } from 'react-icons/md';
import GoogleAuth from '../components/auth/GoogleAuth';
import './LoginPage.scss';

const LoginPage = () => {
  return (
    <div className="login-container">
      <img className="login-logo" src={logo} alt="logo"></img>
      <h2 className="login-title">welcome to cleancheeks</h2>
      <GoogleAuth />
      <div className="divider">
        <hr className="divider-line" />
        or
        <hr className="divider-line" />
      </div>
      <Link to="/home" className="continue-text">
        Continue without logging in
        <MdArrowRight />
      </Link>
    </div>
  );
};

export default LoginPage;
