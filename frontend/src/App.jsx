import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import MapPage from './pages/MapPage';
import Api from './api/api';
import { ToastContext, UserContext } from './utilities/context';
import LoginPage from './pages/LoginPage';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import focused_face from './assets/focused_face.png';
import ToiletControlller from './api/ToiletController';
import { getLocalStorageValue } from './utilities/localStorage';
import { ACCESS_TOKEN_KEY } from './constants';

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
};

function App() {
  const [user, setUser] = useState(false);
  const [toastType, setToastType] = useState(null);
  const [toiletPreferences, setToiletPreferences] = useState([]);

  const fetchToiletPreferences = useCallback(async () => {
    await ToiletControlller.fetchToiletWithUserPreferences()
      .then((result) => {
        setToiletPreferences(result.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    const accessToken = getLocalStorageValue(ACCESS_TOKEN_KEY);
    Api.makeApiRequest({
      method: 'POST',
      url: '/auth/check-login',
      data: { accessToken },
    })
      .then(() => setUser(true))
      .catch(() => setUser(false));

    fetchToiletPreferences();
  }, [fetchToiletPreferences]);

  return (
    <>
      <UserContext.Provider
        value={{ user, setUser, toiletPreferences, fetchToiletPreferences }}
      >
        <Router>
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
        </Router>
      </UserContext.Provider>

      {toastType !== null && (
        <ToastContainer position="bottom-center">
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
    </>
  );
}

export default App;
