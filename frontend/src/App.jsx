import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import MapPage from './pages/MapPage';
import { getLocalStorageValue } from './utilities/localStorage';
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from './constants';
import { ToastContext } from './utilities/context';
import LoginPage from './pages/LoginPage';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import focused_face from './assets/focused_face.png';

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
  const [user, setUser] = useState();
  const [toastType, setToastType] = useState(null);

  
  useEffect(() => {
    setUser(
      getLocalStorageValue(ACCESS_TOKEN_KEY) &&
        getLocalStorageValue(USER_ID_KEY)
    );
  }, []);

  return (
    <>
      <Router>
        <ToastContext.Provider value={setToastType}>
          <Routes>
            <Route path="/home" className="app" element={<MapPage />} />
            <Route
              exact
              path="/"
              element={!user ? <LoginPage /> : <Navigate to="/home" replace />}
            />
          </Routes>
        </ToastContext.Provider>
      </Router>

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
