import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Api from '../../api/api';
import './GoogleAuth.scss';
import { UserContext } from '../../utilities/context';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState('');
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const onSuccess = (response) => {
    try {
      if (!response.errors) {
        Api.makeApiRequest({
          method: 'POST',
          url: '/auth/google',
          data: { response },
        }).then(() => {
          setUser(true);
          navigate('/home');
        });
      }
    } catch (e) {
      setErrorMsg('Error signing in with Google. Try again.');
    }
  };

  const onFailure = () => {
    setErrorMsg('Error signing in with Google. Try again.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="google-auth-container">
        <GoogleLogin
          className="google-login-button"
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
        <p className="error-msg">{errorMsg}</p>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
