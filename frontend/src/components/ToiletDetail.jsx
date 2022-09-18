import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Offcanvas from 'react-bootstrap/Offcanvas';
import StyledUtility from './ToiletDetail/StyledUtility';

import { GrFavorite, GrFormPreviousLink } from 'react-icons/gr';
import { ToiletUtilities } from '../enums/ToiletEnums';
import './ClusterDetails.scss';
import './ToiletDetail.scss';
import { getCleanlinessMetadata } from './ToiletDetail/Util';

const ToiletDetail = ({ building, toilet, isShow, onBack, onHide }) => {
  const {
    isFavourite,
    isBlacklist,
    description,
    floor,
    cleanliness,
    utilities,
  } = toilet;

  const fmtedFloor = floor < 0 ? `B${Math.abs(floor)}` : floor.toString();
  const { text, type } = getCleanlinessMetadata(cleanliness);
  const valueGreater = 85.6;

  return (
    <Offcanvas
      className="offcanvas-container"
      placement="bottom"
      show={isShow}
      onHide={() => onHide()}
    >
      <Offcanvas.Header>
        <GrFormPreviousLink onClick={onBack} size={28} />
        <Offcanvas.Title>
          <p className="m-0">{`${building}, Level ${fmtedFloor}`}</p>
          <p className="m-0 text-muted fs-6">{description}</p>
        </Offcanvas.Title>
        <div>
          <GrFavorite className="icons" size={21} />
          <GrFavorite size={21} />
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p className="mb-3 h6 fw-bold">Utilities</p>
        <div className="toilet-utilities box">
          {Object.keys(ToiletUtilities).map((utility, i) => (
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
