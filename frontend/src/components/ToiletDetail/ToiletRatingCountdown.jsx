import React from 'react';
import { format, parseISO } from 'date-fns';

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

export default ToiletRatingCountdown;
