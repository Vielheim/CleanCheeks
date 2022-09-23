import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import styles from './ToiletsLoadingPlaceholder.module.scss';

const ToiletsLoadingPlaceholder = () => {
  return (
    <Card className={styles['toilet-loading-row']}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <div className={styles['toilet-loading-text']}>
        Loading the toilets...
      </div>
    </Card>
  );
};

export default ToiletsLoadingPlaceholder;
