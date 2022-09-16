import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { gapi } from 'gapi-script';
import { setLocalStorageValue } from '../../utilities/localStorage';
import { authTokenKey, userIdKey } from '../../consts/consts';
import './GoogleAuth.scss';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const responseGoogle = (response) => {
    const bodyObject = {
      authId: response.tokenId,
    };
    try {
      if (isEmpty(response.errors)) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/auth/google`, bodyObject)
          .then((res) => {
            const { user, token } = res.data.data;
            setLocalStorageValue(authTokenKey, token);
            setLocalStorageValue(userIdKey, user.id);
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

  useEffect(() => {
    const clientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
    const start = () => {
      gapi.auth2.init({ clientId: clientId, scope: '' });
    };
    gapi.load('client:auth2', start);
  });

  return (
    <div className="googleAuthContainer">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={onFailure}
      />
      <p>{errorMsg}</p>
    </div>
  );
};

export default GoogleAuth;
