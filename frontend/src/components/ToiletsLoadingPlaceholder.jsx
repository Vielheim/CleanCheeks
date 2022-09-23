import Spinner from 'react-bootstrap/Spinner';
import styles from './ToiletsLoadingPlaceholder.module.scss';

const ToiletsLoadingPlaceholder = () => {
  return (
    <div className={styles['toilet-loading-row']}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>

      <p className="mx-3">Loading the toilets...</p>
    </div>
  );
};

export default ToiletsLoadingPlaceholder;
