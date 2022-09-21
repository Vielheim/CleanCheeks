import React, { useMemo } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import StyledUtility from '../StyledUtility/StyledUtility';

import { Utilities } from '../../enums/ToiletEnums';
import { getPreferenceTypeDisplay } from '../../enums/ToiletPreferenceEnums';
import { fmtDistance, getDistance } from '../../utilities/Util';
import { getCleanlinessMetadata } from '../../utilities/Util';
import styles from './ToiletCard.module.scss';

const UTILITIES = [
  [Utilities.FRAGRANCE, Utilities.WATERCOOLER],
  [Utilities.BIDETS, Utilities.SHOWERS],
];

const ToiletCard = ({ toilet, onSelect, tagType, userLocation }) => {
  const {
    id,
    building,
    description,
    floor,
    cleanliness,
    num_seats,
    num_squats,
    utilities,
    user_preference_type,
    latitude,
    longitude,
  } = toilet;

  const { text, type } = getCleanlinessMetadata(cleanliness);
  const fmtedFloor = floor < 0 ? `B${Math.abs(floor)}` : floor.toString();

  const tagDisplay = useMemo(() => {
    if (tagType === 'distance') {
      return fmtDistance(
        getDistance(latitude, longitude, userLocation[0], userLocation[1])
      );
    }
    if (tagType === 'user_preference' && user_preference_type) {
      return getPreferenceTypeDisplay(user_preference_type);
    }
  }, [latitude, longitude, tagType, userLocation, user_preference_type]);

  return (
    <Card key={id} className="mb-3" onClick={() => onSelect(toilet)}>
      <Card.Body>
        <Card.Title className={`${styles['card-header']} border-0 p-0`}>
          <p className="mb-2">{`${building}, Level ${fmtedFloor}`}</p>
          {tagDisplay && (
            <p className={`${styles['preference']} mb-2 text-muted`}>
              {tagDisplay}
            </p>
          )}
        </Card.Title>
        <Card.Subtitle className="mb-1 text-muted">{description}</Card.Subtitle>
        <Badge className="mb-2" bg={type}>{`${text} cleanliness`}</Badge>
        <Row className="mb-1">
          <Col>{`Number of seats: ${num_seats}`}</Col>
          <Col>{`Number of squats: ${num_squats}`}</Col>
        </Row>

        {UTILITIES.length > 0 && (
          <Container className={styles['toilet-utilities-row']}>
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
};

export default ToiletCard;