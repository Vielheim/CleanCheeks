import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import { getDistance } from '../utilities';
import StyledUtility from './ToiletDetail/StyledUtility';

import { ToiletUtilities } from '../enums/ToiletEnums';
import './ClusterDetails.scss';
import { GrFormPreviousLink, GrFavorite } from 'react-icons/gr';

const ToiletDetail = ({ building, toilet, isShow, onBack, onHide }) => {
  const {
    isFavourite,
    isBlacklist,
    description,
    floor,
    cleanliness,
    num_seats,
    num_squats,
    utilities,
  } = toilet;

  const fmtedFloor = floor < 0 ? `B${Math.abs(floor)}` : floor.toString();

  return (
    <Offcanvas
      className="offcanvas-container"
      placement="bottom"
      show={isShow}
      onHide={() => onHide()}
    >
      <Offcanvas.Header>
        <GrFormPreviousLink onClick={onBack} size={24} />
        <Offcanvas.Title>{`${building}, Level ${fmtedFloor}`}</Offcanvas.Title>
        <GrFavorite size={24} />
        <GrFavorite size={24} />
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Card className="mb-3 offcanvas-inner-container"></Card>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ToiletDetail;
