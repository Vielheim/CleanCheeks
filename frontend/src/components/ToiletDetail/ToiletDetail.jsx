import React, { useCallback, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Offcanvas from 'react-bootstrap/Offcanvas';
import StyledUtility from '../shared/StyledUtility';

import { GrFormPreviousLink } from 'react-icons/gr';
import ToiletControlller from '../../api/ToiletController';
import { Utilities } from '../../enums/ToiletEnums';
import '../ClusterDetails.module.scss';
import { getCleanlinessMetadata } from '../shared/Util';
import PreferenceIcons from './PreferenceIcons';
import styles from './ToiletDetail.module.scss';
import ToiletRating from './ToiletRating';

const ToiletDetail = ({ building, toilet, isShow, onBack, onHide }) => {
  const { id, description, floor, utilities } = toilet;

  const fmtedFloor = floor < 0 ? `B${Math.abs(floor)}` : floor.toString();

  const [cleanlinessMetadata, setCleanlinessMetadata] = useState({
    text: 'BAD',
    type: 'danger',
  });
  const [percentageBeat, setPercentageBeat] = useState(0);

  const updateToiletRank = useCallback(async () => {
    await ToiletControlller.getToiletRank(id)
      .then((result) => {
        const cleanliness = result.data.toilet.cleanliness;
        setPercentageBeat(result.data.percentageBeat);
        setCleanlinessMetadata(getCleanlinessMetadata(cleanliness));
        toilet.cleanliness = cleanliness;
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id, toilet]);

  const onUpdateToiletPreference = (preference) => {
    toilet.user_preference_type = preference;
  };

  useEffect(() => {
    updateToiletRank();
  }, [updateToiletRank]);

  return (
    <Offcanvas
      className={styles['offcanvas-container']}
      placement="bottom"
      show={isShow}
      onHide={onHide}
    >
      <Offcanvas.Header>
        <GrFormPreviousLink onClick={onBack} size={28} />
        <Offcanvas.Title className="text-center">
          <p className="m-0">{`${building}, Level ${fmtedFloor}`}</p>
          <p className="m-0 text-muted fs-6">{description}</p>
        </Offcanvas.Title>
        <PreferenceIcons
          toiletId={id}
          initPreferenceType={toilet.user_preference_type}
          onSetPreferenceType={onUpdateToiletPreference}
        />
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className={styles['toilet-summary']}>
          <p className={styles['toilet-summary-item']}>
            {cleanlinessMetadata.quote}
          </p>

          <img
            className={styles['toilet-summary-item']}
            alt={cleanlinessMetadata.text}
            src={cleanlinessMetadata.icon}
            width={100}
            height={100}
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
            This toilet is cleaner than <strong>{percentageBeat}%</strong> of
            all other toilets on campus!
          </p>
        </div>
        <p className="mb-3 h6 fw-bold">Your Rating</p>
        <div className={styles['box']}>
          <ToiletRating toiletId={id} onRate={updateToiletRank} />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ToiletDetail;
