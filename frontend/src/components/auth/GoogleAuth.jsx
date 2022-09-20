import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLocalStorageValue } from '../../utilities/localStorage';
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from '../../constants';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Api from '../../api/api';
import './GoogleAuth.scss';

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
        }).then((result) => {
          const { userId, accessToken } = result.data;
          setLocalStorageValue(ACCESS_TOKEN_KEY, accessToken);
          setLocalStorageValue(USER_ID_KEY, userId);
          navigate('/home');
        });
      }
    } catch (e) {
      console.log(e);
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
