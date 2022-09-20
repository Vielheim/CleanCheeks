const DIRTY_CLEANLINESS_VALUE = -0.25;
const CLEAN_CLEANLINESS_VALUE = 0.25;

export const getCleanlinessMetadata = (cleanliness) => {
  if (cleanliness < DIRTY_CLEANLINESS_VALUE) {
    return {
      text: 'BAD',
      type: 'danger',
    };
  } else if (cleanliness > CLEAN_CLEANLINESS_VALUE) {
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

export const getToiletsBreakdown = (toilets) => toilets.map(({cleanliness}) => getCleanlinessMetadata(cleanliness)).reduce((breakdown, {text}) => {
  breakdown[text] += 1;
  return breakdown;
}, {
  BAD: 0,
  AVERAGE: 0,
  GOOD: 0,
});