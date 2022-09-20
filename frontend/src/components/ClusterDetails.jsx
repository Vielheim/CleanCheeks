import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import { getDistance } from '../utilities';
import StyledUtility from './shared/StyledUtility';
import ToiletDetail from './ToiletDetail/ToiletDetail';

import { Utilities } from '../enums/ToiletEnums';
import './ClusterDetails.scss';
import { getCleanlinessMetadata } from './shared/Util';

const UTILITIES = [
  [Utilities.SHOWERS, Utilities.BIDETS],
  [Utilities.WATERCOOLER, Utilities.FRAGRANCE],
];

const fmtDistance = (distance) =>
  distance >= 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`;

const ClusterDetails = ({ currLocation, cluster, isShow, setIsShow }) => {
  const { building, latitude, longitude, toilets } = cluster;
  const numToilets = toilets.length;
  const distance = getDistance(
    latitude,
    longitude,
    currLocation[0],
    currLocation[1]
  );

  const [selectedToilet, setSelectedToilet] = useState(null);

  const onHide = () => {
    setSelectedToilet(null);
    setIsShow(false);
  };

  if (selectedToilet != null) {
    return (
      <ToiletDetail
        building={building}
        toilet={selectedToilet}
        isShow={isShow}
        onBack={() => setSelectedToilet(null)}
        onHide={onHide}
      />
    );
  }

  // ORDER BY FLOOR ASC, CLEANLINESS DESC, ID ASC
  const sortToilets = (toilet1, toilet2) => {
    const orderByFloorAsc = toilet1.floor - toilet2.floor;
    const orderByCleanDesc = toilet2.cleanliness - toilet1.cleanliness;
    const orderByIdAsc = toilet1.id - toilet2.id;

    if (orderByFloorAsc !== 0) {
      return orderByFloorAsc;
    }
    if (orderByCleanDesc !== 0) {
      return orderByCleanDesc;
    }
    return orderByIdAsc;
  };

  return (
    <Offcanvas
      className="offcanvas-container"
      placement="bottom"
      show={isShow}
      onHide={() => setIsShow(false)}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{`${numToilets} toilet${
          numToilets > 1 ? 's' : ''
        } are at ${building}`}</Offcanvas.Title>
      </Offcanvas.Header>
      <div className="distance">
        <strong>{fmtDistance(distance)}</strong> away from your location
      </div>
      <Offcanvas.Body>
        {toilets
          .filter(({ floor }) => floor < 8 && floor !== 0)
          .sort(sortToilets)
          .map((toilet, i) => {
            const {
              description,
              floor,
              cleanliness,
              num_seats,
              num_squats,
              utilities,
            } = toilet;
            const { text, type } = getCleanlinessMetadata(cleanliness);
            const fmtedFloor =
              floor < 0 ? `B${Math.abs(floor)}` : floor.toString();
            return (
              <Card
                key={i}
                className="mb-3 offcanvas-inner-container"
                onClick={() => setSelectedToilet(toilet)}
              >
                <Card.Body>
                  <Card.Title>{`${building}, Level ${fmtedFloor}`}</Card.Title>
                  <Card.Subtitle className="mb-1">{description}</Card.Subtitle>
                  <Badge
                    className="mb-2"
                    bg={type}
                  >{`${text} cleanliness`}</Badge>
                  <Row className="mb-1">
                    <Col>{`Number of seats: ${num_seats}`}</Col>
                    <Col>{`Number of squats: ${num_squats}`}</Col>
                  </Row>

                  {UTILITIES.length > 0 && (
                    <Container className="toilet-utilities-row">
                      {UTILITIES.map((group, i) => (
                        <Row key={i}>
                          {group.map((utility, i) => (
                            <Col key={i}>
                              <StyledUtility
                                utility={utility}
                                presentUtilities={utilities}
                              />
                            </Col>
                          ))}
                        </Row>
                      ))}
                    </Container>
                  )}
                </Card.Body>
              </Card>
            );
          })}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ClusterDetails;
