import React, { useState, useEffect } from 'react';
import './ToiletRating.scss';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { TOILET_RATING } from '../constants';

// TODO: Update styling to be consistent with Toilet Details page
const ToiletRating = () => {
  const [nextRatingTime, setNextRatingTime] = useState(null);

  useEffect(() => {
    // Check if user has rated (storage or something)
    // If not rated, display rating buttons
    // If rated, display next rating time
    // Not sure if we can refresh the page at the next-rating-time (countdown?)
  }, []);

  const rateToilet = (rating) => {
    const type = rating;
    const user_id = '';
    const toilet_id = '';

    // POST to backend, await response
    // If success: save the next rating date/time -> determine when we can vote again
    // If failure: notify user
  };

  const rateCleanToilet = () => {
    rateToilet(TOILET_RATING.CLEAN);
  };

  const rateDirtyToilet = () => {
    rateToilet(TOILET_RATING.DIRTY);
  };

  return (
    <Container className="my-2">
      <Row>
        <Col className="text-center">
          <Button variant="success" onClick={rateCleanToilet}>
            Clean!
          </Button>
        </Col>

        <Col className="text-center">
          <Button variant="danger" onClick={rateDirtyToilet}>
            Dirty!
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ToiletRating;
