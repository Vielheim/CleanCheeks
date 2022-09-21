import { TOILET_CLEANLINESS_METADATA, TOILET_QUOTES } from '../../constants';

const DIRTY_CLEANLINESS_VALUE = -0.25;
const CLEAN_CLEANLINESS_VALUE = 0.25;

const getRandomToiletQuote = (quotes) => {
  const idx = Math.floor(Math.random() * quotes.length);
  return quotes[idx];
};

export const getCleanlinessMetadata = (cleanliness) => {
  let key = '';
  if (cleanliness < DIRTY_CLEANLINESS_VALUE) {
    key = 'BAD';
  } else if (cleanliness > CLEAN_CLEANLINESS_VALUE) {
    key = 'GOOD';
  } else {
    key = 'AVERAGE';
  }

  const metadata = TOILET_CLEANLINESS_METADATA[key];
  const quote = getRandomToiletQuote(TOILET_QUOTES[key]);
  metadata.quote = quote;
  return metadata;
};

export const getToiletsBreakdown = (toilets) =>
  toilets
    .map(({ cleanliness }) => getCleanlinessMetadata(cleanliness))
    .reduce(
      (breakdown, { text }) => {
        breakdown[text] += 1;
        return breakdown;
      },
      {
        BAD: 0,
        AVERAGE: 0,
        GOOD: 0,
      }
    );
