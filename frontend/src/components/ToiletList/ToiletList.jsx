import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import StyledUtility from '../StyledUtility/StyledUtility';
import ToiletDetail from '../ToiletDetail/ToiletDetail';

import { Utilities } from '../../enums/ToiletEnums';
import { getPreferenceTypeDisplay } from '../../enums/ToiletPreferenceEnums';
import './ToiletList.scss';
import { getCleanlinessMetadata, sortToilets } from '../shared/Util';

const UTILITIES = [
  [Utilities.FRAGRANCE, Utilities.WATERCOOLER],
  [Utilities.BIDETS, Utilities.SHOWERS],
];

const ToiletList = ({ toilets, isShow, onCustomHide }) => {
  const [selectedToilet, setSelectedToilet] = useState(null);

  const onHide = () => {
    setSelectedToilet(null);
    onCustomHide();
  };

  if (selectedToilet != null) {
    return (
      <ToiletDetail
        building={selectedToilet.building}
        toilet={selectedToilet}
        isShow={isShow}
        onBack={() => setSelectedToilet(null)}
        onHide={onHide}
      />
    );
  }

  return (
    <>
      {toilets
        .filter(({ floor }) => floor < 8 && floor !== 0)
        .sort(sortToilets)
        .map((toilet, i) => {
          const {
            building,
            description,
            floor,
            cleanliness,
            num_seats,
            num_squats,
            utilities,
            user_preference_type,
          } = toilet;

          const { text, type } = getCleanlinessMetadata(cleanliness);
          const fmtedFloor =
            floor < 0 ? `B${Math.abs(floor)}` : floor.toString();
          return (
            <Card
              key={i}
              className="mb-3"
              onClick={() => setSelectedToilet(toilet)}
            >
              <Card.Body>
                <Card.Title className="card-header border-0 p-0">
                  <p className="mb-2">{`${building}, Level ${fmtedFloor}`}</p>
                  {user_preference_type && (
                    <p className="mb-2 text-muted preference">
                      {getPreferenceTypeDisplay(user_preference_type)}
                    </p>
                  )}
                </Card.Title>
                <Card.Subtitle className="mb-1 text-muted">
                  {description}
                </Card.Subtitle>
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
    </>
  );
};

export default ToiletList;
