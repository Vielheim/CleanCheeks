import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { TOILET_RATING } from '../../constants';
import {
  getLocalStorageValue,
  removeLocalStorageValue,
  setLocalStorageValue,
} from '../../utilities/localStorage';
import ToiletRatingController from '../../api/ToiletRatingController';
import { format, parseISO, differenceInMilliseconds } from 'date-fns';

const ToiletRatingCountdown = ({ nextRatingTime }) => {
  const fmtNextRatingTime = format(
    parseISO(nextRatingTime),
    'd MMM yyyy hh:mm a'
  );
  return (
    <p className="h6 text-muted">
      Thanks for voting! You can vote again after {fmtNextRatingTime}
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

const ToiletRating = ({ toilet_id }) => {
  const [nextRatingTime, setNextRatingTime] = useState(null);
  const rating_info_key = `rating_info_${toilet_id}`;

  // Check if the user is able to rate this toilet
  useEffect(() => {
    const checkUserLastRated = async () => {
      let rating_info = getLocalStorageValue(rating_info_key); // Check cache

      // No info stored in cache, check with backend
      if (!rating_info) {
        return await ToiletRatingController.getUserLastRatedInfo(toilet_id)
          .then((res) => {
            updateRatingInfo(res.data);
          })
          .catch((e) => {
            if (e.status === 404) {
              setNextRatingTime(null); // User has not voted, set the rating to null
            } else {
              console.log(e); // TODO: Handle error
            }
          });
      }

      // info present in cache
      const next_rating_time = rating_info.next_rating_time;
      updateNextRatingTime(next_rating_time);
    };

    checkUserLastRated();
  });

  // Update rating component when nextRatingTime expires
  useEffect(() => {
    if (nextRatingTime) {
      const parsedDateTime = parseISO(nextRatingTime);
      const currentDateTime = new Date();

      if (parsedDateTime >= currentDateTime) {
        const diff = differenceInMilliseconds(parsedDateTime, currentDateTime);
        const timer = setTimeout(() => {
          clearNextRatingTime();
        }, diff);

        return () => clearTimeout(timer);
      }
    }
  }, [nextRatingTime]);

  const rateToilet = async (rating) => {
    const data = {
      toilet_id: toilet_id,
      type: rating,
    };

    await ToiletRatingController.addUserRating(data)
      .then((res) => {
        updateRatingInfo(res.data);
      })
      .catch((e) => console.log(e)); // TODO: Handle error
  };

  const rateCleanToilet = async () => {
    await rateToilet(TOILET_RATING.CLEAN);
  };

  const rateDirtyToilet = async () => {
    await rateToilet(TOILET_RATING.DIRTY);
  };

  // Update rating info based on backend response
  const updateRatingInfo = (rating) => {
    const next_rating_time = rating.nextRatingTime;
    const rating_info = {
      next_rating_time: next_rating_time,
    };

    setLocalStorageValue(rating_info_key, rating_info); // Cache next_rating_time
    updateNextRatingTime(next_rating_time);
  };

  // Check and update nextRatingTime
  const updateNextRatingTime = (next_rating_time) => {
    if (parseISO(next_rating_time) < new Date()) {
      clearNextRatingTime(); // expired
    } else {
      setNextRatingTime(next_rating_time);
    }
  };

  const clearNextRatingTime = () => {
    removeLocalStorageValue(rating_info_key);
    setNextRatingTime(null);
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
