import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import MapPage from './pages/MapPage';
import { getLocalStorageValue } from './utilities/localStorage';
import { authTokenKey, userIdKey } from './consts/consts';
import LoginPage from './pages/LoginPage';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(
      getLocalStorageValue(authTokenKey) && getLocalStorageValue(userIdKey)
    );
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/home" className="app" element={<MapPage />} />
        <Route
          exact
          path="/"
          element={!user ? <LoginPage /> : <Navigate to="/home" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
