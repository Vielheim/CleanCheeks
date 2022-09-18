import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import { getDistance } from '../utilities';
import StyledUtility from './ToiletDetail/StyledUtility';
import ToiletDetail from './ToiletDetail';

import { ToiletUtilities } from '../enums/ToiletEnums';
import './ClusterDetails.scss';
import { getCleanlinessMetadata } from './ToiletDetail/Util';

const UTILITIES = [
  [ToiletUtilities.SHOWERS, ToiletUtilities.BIDETS],
  [ToiletUtilities.WATERCOOLER, ToiletUtilities.FRAGRANCE],
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

  const [selectedToiletIndex, setSelectedToiletIndex] = useState(null);

  const onHide = () => {
    setSelectedToiletIndex(null);
    setIsShow(false);
  };

  if (selectedToiletIndex != null) {
    return (
      <ToiletDetail
        building={building}
        toilet={toilets[selectedToiletIndex]}
        isShow={isShow}
        onBack={() => setSelectedToiletIndex(null)}
        onHide={onHide}
      />
    );
  }

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
                onClick={() => setSelectedToiletIndex(i)}
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
