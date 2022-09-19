import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Offcanvas from 'react-bootstrap/Offcanvas';
import StyledUtility from '../shared/StyledUtility';

import { FaHeart } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import { Utilities } from '../../enums/ToiletEnums';
import { GrFormPreviousLink } from 'react-icons/gr';
import '../ClusterDetails.scss';
import './ToiletDetail.scss';
import { getCleanlinessMetadata } from '../shared/Util';
import ToiletPreferenceControlller from '../../api/ToiletPreferenceController';
import { PreferenceType } from '../../enums/ToiletPreferenceEnums';

const ToiletDetail = ({ building, toilet, isShow, onBack, onHide }) => {
  const {
    id,
    user_preference_type,
    description,
    floor,
    cleanliness,
    utilities,
  } = toilet;

  const fmtedFloor = floor < 0 ? `B${Math.abs(floor)}` : floor.toString();
  const { text, type } = getCleanlinessMetadata(cleanliness);
  const valueGreater = 85.6;

  const [preference, setPreference] = useState(user_preference_type);

  useEffect(() => {
    setPreference(toilet.user_preference_type);
  }, [toilet]);

  const updateToiletPreference = (type) => {
    ToiletPreferenceControlller.updateToiletPreference(id, type)
      .then((result) => {
        setPreference(result.data.type);
        toilet.user_preference_type = result.data.type;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClickFavourite = () => {
    updateToiletPreference(PreferenceType.FAVOURITE);
  };

  const onClickBlacklist = () => {
    updateToiletPreference(PreferenceType.BLACKLIST);
  };

  return (
    <Offcanvas
      className="offcanvas-container"
      placement="bottom"
      show={isShow}
      onHide={() => onHide()}
    >
      <Offcanvas.Header>
        <GrFormPreviousLink onClick={onBack} size={28} />
        <Offcanvas.Title className="text-center">
          <p className="m-0">{`${building}, Level ${fmtedFloor}`}</p>
          <p className="m-0 text-muted fs-6">{description}</p>
        </Offcanvas.Title>
        <div>
          <FaHeart
            className="favourite-icon"
            color={preference === 'FAVOURITE' ? 'red' : 'lightgrey'}
            size={20}
            onClick={onClickFavourite}
          />
          <TiCancel
            size={28}
            color={preference === 'BLACKLIST' ? 'black' : 'lightgrey'}
            onClick={onClickBlacklist}
          />
        </div>
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
          <Badge className="mb-2" bg={type}>{`${text} cleanliness`}</Badge>
          <p>
            This toilet is cleaner than <strong>{valueGreater}%</strong> of all
            other toilets on campus!
          </p>
        </div>
        <p className="mb-3 h6 fw-bold">Your Rating</p>
        <div className="box" />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ToiletDetail;
