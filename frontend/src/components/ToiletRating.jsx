import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { TOILET_RATING } from '../constants';

const ToiletRatingCountdown = ({ nextRatingTime }) => {
  return (
    <p className="h6 text-muted">
      You can vote again in {nextRatingTime} minutes
    </p>
  );
};

const ToiletRatingButtons = ({ rateCleanToilet, rateDirtyToilet }) => {
  return (
    <Row>
      <Col className="text-center">
        <Button variant="success" onClick={rateCleanToilet}>
          {'Clean! :D'}
        </Button>
      </Col>

      <Col className="text-center">
        <Button variant="danger" onClick={rateDirtyToilet}>
          {'Dirty! >:('}
        </Button>
      </Col>
    </Row>
  );
};

// TODO: Update styling to be consistent with Toilet Details page
const ToiletRating = ({ toilet_id, user_id }) => {
  const [nextRatingTime, setNextRatingTime] = useState(null);

  // TODO: Implement this
  useEffect(() => {
    // Check if user has rated this toilet (maybe saved in local storage)
    // If rated, extract and update nextRatingTime
    // If not rated, display rating buttons
    // Maybe we can refresh the page at the nextRatingTime (countdown?)
  }, []);

  // TODO: Implement this
  const rateToilet = async (rating) => {
    const data = {
      toilet_id: toilet_id,
      user_id: user_id,
      type: rating,
    };

    // POST data to backend, await response
    // If success: save the next rating date/time in local storage and state
    setNextRatingTime('NEVER');
    // If failure: notify user
  };

  const rateCleanToilet = async () => {
    await rateToilet(TOILET_RATING.CLEAN);
  };

  const rateDirtyToilet = async () => {
    await rateToilet(TOILET_RATING.DIRTY);
  };

  return (
    <Container className="my-2">
      {nextRatingTime ? (
        <ToiletRatingCountdown nextRatingTime={nextRatingTime} />
      ) : (
        <ToiletRatingButtons
          rateCleanToilet={rateCleanToilet}
          rateDirtyToilet={rateDirtyToilet}
        />
      )}
    </Container>
  );
};

export default ToiletRating;
