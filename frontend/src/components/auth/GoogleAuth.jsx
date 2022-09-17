import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { setLocalStorageValue } from '../../utilities/localStorage';
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from '../../constants';
import './GoogleAuth.scss';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const responseGoogle = (response) => {
    try {
      if (isEmpty(response.errors)) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/auth/google`, response)
          .then((res) => {
            const { user, accessToken } = res.data.data;
            setLocalStorageValue(ACCESS_TOKEN_KEY, accessToken);
            setLocalStorageValue(USER_ID_KEY, user.id);
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
      <div className="googleAuthContainer">
        <GoogleLogin onSuccess={responseGoogle} onFailure={onFailure} />
        <p>{errorMsg}</p>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
