import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
    body:
      'Looks like you are not connected to the internet. Cleancheeks will ' +
      'only be able to give you updated toilets near you once you are ' +
      'connected.',
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
  RATING: {
    title: 'Thank you!',
    body: 'You have successfully rated this toilet!',
    bg: 'light',
    img: focused_face,
  },
  FAVOURITE: {
    title: 'Favourited! :D',
    body: "We've added this toilet to your favourites!",
    bg: 'light',
    img: focused_face,
  },
  BLACKLIST: {
    title: 'Blacklisted :<',
    body: "We've added this toilet to your blacklist!",
    bg: 'light',
    img: focused_face,
  },
  UNFAVOURITE: {
    title: 'Unfavourited!',
    body: "We've removed this toilet from your favourites!",
    bg: 'light',
    img: focused_face,
  },
  UNBLACKLIST: {
    title: 'Unblacklisted!',
    body: "We've removed this toilet from your blacklist!",
    bg: 'light',
    img: focused_face,
  },
};

function App() {
  const [user, setUser] = useState(false);
  const [toastType, setToastType] = useState(null);
  const [toiletPreferences, setToiletPreferences] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
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
  }, [checkUserLogin]);

  useEffect(() => {
    fetchToiletPreferences();
  }, [fetchToiletPreferences]);

  const toastValue = useMemo(() => {
    if (toastType == null) {
      return null;
    }
    if (!isOnline) {
      return 'OFFLINE';
    }
    return toastType;
  }, [isOnline, toastType]);

  window.addEventListener('online', () => {
    setToastType('ONLINE');
    setIsOnline(true);
  });
  window.addEventListener('offline', () => {
    setToastType('OFFLINE');
    setIsOnline(false);
  });

  return (
    <>
      <Router>
        <UserContext.Provider
          value={{
            user,
            setUser,
            toiletPreferences,
            fetchToiletPreferences,
          }}
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

        {toastValue !== null && (
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
                    src={TOAST_CONTENTS[toastValue].img}
                    height={25}
                    width="auto"
                  />
                  <strong className="toast-header-title">
                    {TOAST_CONTENTS[toastValue].title}
                  </strong>
                </div>
              </Toast.Header>
              <Toast.Body>{TOAST_CONTENTS[toastValue].body}</Toast.Body>
            </Toast>
          </ToastContainer>
        )}
      </Router>
    </>
  );
}

export default App;
