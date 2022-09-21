import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import MapPage from './pages/MapPage';
import Api from './api/api';
import LoginPage from './pages/LoginPage';
import { useEffect } from 'react';
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from './utilities/localStorage';
import { USER_KEY } from './constants';

function App() {
  const isAuthenticated = () => {
    Api.makeApiRequest({
      method: 'POST',
      url: '/auth/check-login',
    })
      .then(() => setLocalStorageValue(USER_KEY, true))
      .catch(() => setLocalStorageValue(USER_KEY, false));
  };

  useEffect(() => isAuthenticated(), []);

  return (
    <Router>
      <Routes>
        <Route path="/home" className="app" element={<MapPage />} />
        <Route
          exact
          path="/"
          element={
            getLocalStorageValue(USER_KEY) ? (
              <Navigate to="/home" />
            ) : (
              <LoginPage />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
