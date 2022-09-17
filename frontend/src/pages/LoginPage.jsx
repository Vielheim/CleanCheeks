import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { MdArrowRight } from 'react-icons/md';
import GoogleAuth from '../components/auth/GoogleAuth';
import './LoginPage.scss';

const LoginPage = () => {
  return (
    <div className="loginContainer">
      <img src={logo} alt="logo"></img>
      <h2>welcome to cleancheeks</h2>
      <GoogleAuth />
      <div className="divider">
        <hr />
        or
        <hr />
      </div>
      <Link to="/home" className="continueText">
        Continue without logging in
        <MdArrowRight />
      </Link>
    </div>
  );
};

export default LoginPage;
