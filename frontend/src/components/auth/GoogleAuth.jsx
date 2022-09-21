import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Api from '../../api/api';
import './GoogleAuth.scss';
import { setLocalStorageValue } from '../../utilities/localStorage';
import { USER_KEY } from '../../constants';

const GoogleAuth = () => {
  const navigate = useNavigate();
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
          setLocalStorageValue(USER_KEY, true);
          navigate('/home');
        });
      }
    } catch (e) {
      setLocalStorageValue(USER_KEY, false);
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
