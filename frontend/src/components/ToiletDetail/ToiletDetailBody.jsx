import Badge from 'react-bootstrap/Badge';
import StyledUtility from '../StyledUtility/StyledUtility';
import { Utilities } from '../../enums/ToiletEnums';
import ToiletRating from './ToiletRating';
import styles from './ToiletDetailBody.module.scss';

const ToiletDetailBody = ({
  id,
  toiletQuote,
  cleanlinessMetadata,
  percentageBeat,
  updateToiletRank,
  utilities,
}) => {
  return (
    <>
      <div className={styles['toilet-summary']}>
        <p className={styles['toilet-summary-item']}>{toiletQuote}</p>

        <img
          className={styles['toilet-summary-item']}
          alt={cleanlinessMetadata.text}
          src={cleanlinessMetadata.icon}
          width="auto"
          height={window.innerHeight / 6}
        />
      </div>

      <p className="mb-3 h6 fw-bold">Utilities</p>
      <div className={`${styles['toilet-utilities']} ${styles['box']}`}>
        {Object.keys(Utilities).map((utility, i) => (
          <StyledUtility
            key={i}
            utility={utility}
            presentUtilities={utilities}
          />
        ))}
      </div>
      <p className="mb-3 h6 fw-bold">Cleanliness</p>
      <div className={`text-center ${styles['box']}`}>
        <Badge
          className="mb-2"
          bg={cleanlinessMetadata.type}
        >{`${cleanlinessMetadata.text} cleanliness`}</Badge>
        <input
          type="range"
          className="form-range"
          id="disabledRange"
          min="0"
          value={percentageBeat}
          max="100"
          disabled
        />
        <p>
          This toilet is cleaner than <strong>{percentageBeat}%</strong> of all
          other toilets on campus!
        </p>
      </div>
      <p className="mb-3 h6 fw-bold">Your Rating</p>
      <div className={styles['box']}>
        <ToiletRating toiletId={id} onRate={updateToiletRank} />
      </div>
    </>
  );
};

export default ToiletDetailBody;
