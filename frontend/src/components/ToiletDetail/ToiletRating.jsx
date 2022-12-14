import React, { useState, useEffect, useCallback, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { ACCESS_TOKEN_KEY, TOILET_RATING, USER_ID_KEY } from '../../constants';
import {
  getLocalStorageValue,
  removeLocalStorageValue,
  setLocalStorageValue,
} from '../../utilities/localStorage';
import ToiletRatingController from '../../api/ToiletRatingController';
import { parseISO, differenceInMilliseconds } from 'date-fns';
import ToiletRatingButtons from './ToiletRatingButtons';
import ToiletRatingCountdown from './ToiletRatingCountdown';
import { ToastContext, UserContext } from '../../utilities/context';

const ToiletRating = ({ toiletId, onRate }) => {
  const [nextRatingTime, setNextRatingTime] = useState(null);
  const rating_info_key = `rating_info_${toiletId}`;
  const { setUser } = useContext(UserContext);
  const setToastType = useContext(ToastContext);
  const accessToken = getLocalStorageValue(ACCESS_TOKEN_KEY);
  const userId = getLocalStorageValue(USER_ID_KEY);

  const clearNextRatingTime = useCallback(() => {
    removeLocalStorageValue(rating_info_key);
    setNextRatingTime(null);
  }, [rating_info_key]);

  // Check and update nextRatingTime
  const updateNextRatingTime = useCallback(
    (next_rating_time) => {
      if (parseISO(next_rating_time) < new Date()) {
        clearNextRatingTime(); // expired
      } else {
        setNextRatingTime(next_rating_time);
      }
    },
    [clearNextRatingTime]
  );

  // Update rating info based on backend response
  const updateRatingInfo = useCallback(
    (rating) => {
      const next_rating_time = rating.nextRatingTime;
      const rating_info = {
        next_rating_time: next_rating_time,
      };

      setLocalStorageValue(rating_info_key, rating_info); // Cache next_rating_time
      updateNextRatingTime(next_rating_time);
    },
    [rating_info_key, updateNextRatingTime]
  );

  const rateToilet = useCallback(
    async (rating) => {
      const data = {
        toilet_id: toiletId,
        type: rating,
        user_id: userId,
      };

      await ToiletRatingController.addUserRating(data, accessToken)
        .then((res) => {
          updateRatingInfo(res.data);
          onRate();
          setToastType('RATING');
          window.gtag('event', 'rate_toilet', {
            event_category: 'ratings',
            event_label: rating,
          });
        })
        .catch((e) => {
          if (e.status == 401) {
            setToastType('LOGIN');
            setUser(false);
          } else {
            setToastType('ERROR');
          }
        });
    },
    [
      accessToken,
      onRate,
      setToastType,
      setUser,
      toiletId,
      updateRatingInfo,
      userId,
    ]
  );

  const rateCleanToilet = useCallback(async () => {
    await rateToilet(TOILET_RATING.CLEAN);
  }, [rateToilet]);

  const rateDirtyToilet = useCallback(async () => {
    await rateToilet(TOILET_RATING.DIRTY);
  }, [rateToilet]);

  // Check if the user is able to rate this toilet
  useEffect(() => {
    const checkUserLastRated = async () => {
      let rating_info = getLocalStorageValue(rating_info_key); // Check cache

      // No info stored in cache, check with backend
      if (!rating_info) {
        return await ToiletRatingController.getUserLastRatedInfo(
          toiletId,
          userId,
          accessToken
        )
          .then((res) => {
            const data = res.data;

            if (!data) {
              setNextRatingTime(null); // User has not voted, set the rating to null
            } else {
              updateRatingInfo(res.data);
            }
          })
          .catch((e) => {
            if (e.status !== 401) {
              setToastType('ERROR');
            }
          });
      }

      // info present in cache
      const next_rating_time = rating_info.next_rating_time;
      updateNextRatingTime(next_rating_time);
    };

    checkUserLastRated();
  }, [
    accessToken,
    rating_info_key,
    setToastType,
    toiletId,
    updateNextRatingTime,
    updateRatingInfo,
    userId,
  ]);

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
  }, [nextRatingTime, clearNextRatingTime]);

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
