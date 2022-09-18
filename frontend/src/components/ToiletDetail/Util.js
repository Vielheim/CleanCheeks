export const getCleanlinessMetadata = (cleanliness) => {
  if (cleanliness < -0.25) {
    return {
      text: 'BAD',
      type: 'danger',
    };
  } else if (cleanliness > 0.25) {
    return {
      text: 'GOOD',
      type: 'success',
    };
  } else {
    return {
      text: 'AVERAGE',
      type: 'warning',
    };
  }
};
