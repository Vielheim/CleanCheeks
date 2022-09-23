import React from 'react';
import styles from './ToiletDetail.module.scss';
import Alert from 'react-bootstrap/Alert';

const ToiletErrorScreen = () => {
  return (
    <div className={styles['toilet-placeholder-screen']}>
      <Alert variant="danger">ERROR</Alert>

      <p>
        We are not sure which part of the toilet choked...Please come back
        later!
      </p>
    </div>
  );
};

export default ToiletErrorScreen;
