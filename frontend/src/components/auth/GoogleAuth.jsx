import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React, { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthController from '../../api/AuthController';
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from '../../constants';
import { UserContext, ToastContext } from '../../utilities/context';
import { setLocalStorageValue } from '../../utilities/localStorage';
import styles from './GoogleAuth.module.scss';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const { setUser, fetchToiletPreferences } = useContext(UserContext);
  const setToastType = useContext(ToastContext);
  const [errorMsg, setErrorMsg] = useState('');
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const onSuccess = useCallback(
    async (response) => {
      try {
        if (!response.errors) {
          await AuthController.googleLogin(response).then((result) => {
            const { accessToken, userId } = result.data;
            setLocalStorageValue(ACCESS_TOKEN_KEY, accessToken);
            setLocalStorageValue(USER_ID_KEY, userId);
            setUser(true);

            setToastType('WELCOME');
            navigate('/home');

            window.gtag('event', 'login', {
              method: 'Google',
            });
          });

          await fetchToiletPreferences();
        }
      } catch (e) {
        setErrorMsg('Error signing in with Google. Try again.');
        window.gtag('event', 'exception', {
          method: 'Error logging in with Google',
        });
      }
    },
    [fetchToiletPreferences, navigate, setToastType, setUser]
  );

  const onFailure = () => {
    setErrorMsg('Error signing in with Google. Try again.');

    window.gtag('event', 'exception', {
      method: 'Error logging in with Google',
    });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className={styles['google-auth-container']}>
        <GoogleLogin
          className="google-login-button"
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
        <p className={styles['error-msg']}>{errorMsg}</p>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
