import React from 'react';
import styles from './ToiletPlaceholderScreen.module.scss';
import Spinner from 'react-bootstrap/Spinner';

const ToiletLoadingScreen = () => {
  return (
    <div className={styles['toilet-placeholder-screen']}>
      <p>Wait ah, washing toilet...</p>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default ToiletLoadingScreen;
