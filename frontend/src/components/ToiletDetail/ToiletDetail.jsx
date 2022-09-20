import React, { useCallback, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Offcanvas from 'react-bootstrap/Offcanvas';
import StyledUtility from '../shared/StyledUtility';

import { GrFormPreviousLink } from 'react-icons/gr';
import ToiletControlller from '../../api/ToiletController';
import { Utilities } from '../../enums/ToiletEnums';
import '../ClusterDetails.scss';
import { getCleanlinessMetadata } from '../shared/Util';
import PreferenceIcons from './PreferenceIcons';
import './ToiletDetail.scss';
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
      className="offcanvas-container"
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
        <p className="mb-3 h6 fw-bold">Utilities</p>
        <div className="toilet-utilities box">
          {Object.keys(Utilities).map((utility, i) => (
            <StyledUtility
              key={i}
              utility={utility}
              presentUtilities={utilities}
            />
          ))}
        </div>
        <p className="mb-3 h6 fw-bold">Cleanliness</p>
        <div className="box text-center">
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
        <div className="box">
          <ToiletRating toiletId={id} onRate={updateToiletRank} />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ToiletDetail;
