import React, { useMemo } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import StyledUtility from '../StyledUtility/StyledUtility';
import { DISTANCE_KEY, PREFERENCE_KEY } from '../ToiletList/ToiletList';

import { Utilities } from '../../enums/ToiletEnums';
import { getPreferenceTypeDisplay } from '../../enums/ToiletPreferenceEnums';
import { fmtDistance, getDistance, getToiletName } from '../../utilities/Util';
import { getCleanlinessMetadata } from '../../utilities/Util';
import styles from './ToiletCard.module.scss';

const UTILITIES = [
  [Utilities.FRAGRANCE, Utilities.WATERCOOLER],
  [Utilities.BIDETS, Utilities.SHOWERS],
];

const ToiletCard = ({ toilet, onSelect, tagType, userLocation }) => {
  const {
    id,
    description,
    cleanliness,
    num_seats,
    num_squats,
    utilities,
    user_preference_type,
    latitude,
    longitude,
  } = toilet;

  const { text, type } = getCleanlinessMetadata(cleanliness);

  const tagDisplay = useMemo(() => {
    if (tagType === DISTANCE_KEY) {
      return fmtDistance(
        getDistance(latitude, longitude, userLocation[0], userLocation[1])
      );
    }
    if (tagType === PREFERENCE_KEY && user_preference_type) {
      return getPreferenceTypeDisplay(user_preference_type);
    }
  }, [latitude, longitude, tagType, userLocation, user_preference_type]);

  return (
    <Card
      key={id}
      className={`${styles['card-body']} mb-3`}
      onClick={() => onSelect(toilet)}
    >
      <Card.Body>
        <Card.Title className={`${styles['card-header']} border-0 p-0 mb-`}>
          <p>{getToiletName(toilet)}</p>
          {tagDisplay && (
            <p className={`${styles['preference']} mb-2`}>{tagDisplay}</p>
          )}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
        <Badge className="mb-3" bg={type}>{`${text} cleanliness`}</Badge>
        {UTILITIES.length > 0 && (
          <div className={`${styles['container']} mb-2`}>
            <Container className={styles['toilet-utilities-row']}>
              {UTILITIES.map((group, i) => (
                <Row md={4} key={i}>
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
          </div>
        )}
        <div className={styles['num-row']}>
          <div className={styles['sitting']}>
            <span>Sitting: </span>
            <span className="p-1">{num_seats}</span>
          </div>
          <div>
            <span>Squatting: </span>
            <span className="p-1">{num_squats}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ToiletCard;
