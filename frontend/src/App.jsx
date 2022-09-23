import React, { useCallback, useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import AuthController from './api/AuthController';
import ToiletControlller from './api/ToiletController';
import focused_face from './assets/focused_face.png';
import LoginToastBody from './components/LoginToastBody';
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from './constants';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import { ToastContext, UserContext } from './utilities/context';
import { getLocalStorageValue } from './utilities/localStorage';

const TOAST_CONTENTS = {
  OFFLINE: {
    title: 'Oops!',
    body: 'Looks like you are not connected to the internet. Cleancheeks will\
    only be able to give you updated toilets near you once you are\
    connected.',
    bg: 'warning',
    img: focused_face,
  },
  ONLINE: {
    title: 'Hello!',
    body: 'Looks like you are back online. Enjoy your clean cheeks!',
    bg: 'light',
    img: focused_face,
  },
  ERROR: {
    title: 'Oops!',
    body: 'Something went wrong... Try again later!',
    bg: 'warning',
    img: focused_face,
  },
  LOGIN: {
    title: 'Hello!',
    body: <LoginToastBody />,
    bg: 'warning',
    img: focused_face,
  },
  WELCOME: {
    title: 'Successful login!',
    body: 'Welcome to Clean Cheeks!',
    bg: 'light',
    img: focused_face,
  },
};

function App() {
  const [user, setUser] = useState(false);
  const [toastType, setToastType] = useState(null);
  const [toiletPreferences, setToiletPreferences] = useState([]);
  const userId = getLocalStorageValue(USER_ID_KEY);

  const fetchToiletPreferences = useCallback(async () => {
    await ToiletControlller.fetchToiletWithUserPreferences(userId)
      .then((result) => {
        setToiletPreferences(result.data);
      })
      .catch((e) => {
        setToastType('ERROR');
      });
  }, [userId]);

  const checkUserLogin = useCallback(async () => {
    const accessToken = getLocalStorageValue(ACCESS_TOKEN_KEY);
    await AuthController.checkLogin(accessToken)
      .then(() => setUser(true))
      .catch(() => setUser(false));
  }, []);

  useEffect(() => {
    checkUserLogin();
    fetchToiletPreferences();
  }, [checkUserLogin, fetchToiletPreferences]);

  return (
    <>
      <Router>
        <UserContext.Provider
          value={{ user, setUser, toiletPreferences, fetchToiletPreferences }}
        >
          <ToastContext.Provider value={setToastType}>
            <Routes>
              <Route path="/home" className="app" element={<MapPage />} />
              <Route
                exact
                path="/"
                element={
                  !user ? <LoginPage /> : <Navigate to="/home" replace />
                }
              />
            </Routes>
          </ToastContext.Provider>
        </UserContext.Provider>

        {toastType !== null && (
          <ToastContainer position="top-center">
            <Toast
              className="mb-4 offline-toast"
              bg={TOAST_CONTENTS[toastType].bg}
              show={true}
              onClose={() => setToastType(null)}
              delay={4000}
              autohide
            >
              <Toast.Header className="toast-header">
                <div className="toast-header-content">
                  <img
                    alt="Focused Face"
                    src={TOAST_CONTENTS[toastType].img}
                    height={25}
                    width={25}
                  />
                  <strong className="toast-header-title">
                    {TOAST_CONTENTS[toastType].title}
                  </strong>
                </div>
              </Toast.Header>
              <Toast.Body>{TOAST_CONTENTS[toastType].body}</Toast.Body>
            </Toast>
          </ToastContainer>
        )}
      </Router>
    </>
  );
}

export default App;
