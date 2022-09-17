import React from 'react';
import { capitalize } from 'lodash';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { GrFormCheckmark, GrFormClose } from 'react-icons/gr';
import { getDistance } from '../utilities';

import './ClusterDetails.scss';

const UTILITIES = [
  ['Showers', 'Bidets'],
  ['Watercooler', 'Fragrance'],
];

const getCleanlinessMetadata = (cleanliness) => {
  if (cleanliness < -0.25) {
    return {
      text: 'BAD',
      type: 'danger',
    };
  } else if (cleanliness > 0.25) {
    return {
      text: 'AVERAGE',
      type: 'warning',
    };
  } else {
    return {
      text: 'GOOD',
      type: 'success',
    };
  }
};

const getStyledUtility = (utility, presentUtilities) => {
  const isPresent = presentUtilities.includes(utility.toUpperCase());
  const icon = isPresent ? <GrFormCheckmark /> : <GrFormClose />;
  const cssClass = isPresent ? '' : 'non-exist-utility';

  return (
    <div className={cssClass}>
      {icon}
      {`  ${capitalize(utility)}`}
    </div>
  );
};

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
              <Card key={i} className="mb-3">
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
                              {getStyledUtility(utility, utilities)}
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
