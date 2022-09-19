import React, { useCallback, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Offcanvas from 'react-bootstrap/Offcanvas';
import StyledUtility from '../shared/StyledUtility';

import { FaHeart } from 'react-icons/fa';
import { GrFormPreviousLink } from 'react-icons/gr';
import { TiCancel } from 'react-icons/ti';
import ToiletPreferenceControlller from '../../api/ToiletPreferenceController';
import { Utilities } from '../../enums/ToiletEnums';
import { PreferenceType } from '../../enums/ToiletPreferenceEnums';
import '../ClusterDetails.scss';
import { getCleanlinessMetadata } from '../shared/Util';
import './ToiletDetail.scss';
import ToiletRating from './ToiletRating';
import ToiletControlller from '../../api/ToiletController';

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

  const [preference, setPreference] = useState(user_preference_type);
  const [percentageBeat, setPercentageBeat] = useState(0);

  const updateToiletPreference = useCallback(
    async (type) => {
      await ToiletPreferenceControlller.updateToiletPreference(id, type)
        .then((result) => {
          setPreference(result.data.type);
          toilet.user_preference_type = result.data.type;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [id, toilet]
  );

  const onClickFavourite = useCallback(() => {
    updateToiletPreference(PreferenceType.FAVOURITE);
  }, [updateToiletPreference]);

  const onClickBlacklist = useCallback(() => {
    updateToiletPreference(PreferenceType.BLACKLIST);
  }, [updateToiletPreference]);

  const getToiletRank = useCallback(async () => {
    await ToiletControlller.getToiletRank(id)
      .then((result) => {
        setPercentageBeat(result.data.percentageBeat);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  useEffect(() => {
    setPreference(toilet.user_preference_type);
  }, [toilet]);

  useEffect(() => {
    getToiletRank();
  }, [getToiletRank]);

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
            This toilet is cleaner than <strong>{percentageBeat}%</strong> of
            all other toilets on campus!
          </p>
        </div>
        <p className="mb-3 h6 fw-bold">Your Rating</p>
        <div className="box">
          <ToiletRating toilet_id={id} />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ToiletDetail;
