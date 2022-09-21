import { TOILET_CLEANLINESS_METADATA, TOILET_QUOTES } from '../../constants';
import { getOrder } from '../../enums/ToiletPreferenceEnums';

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

// ORDER BY FAVOURITE -> BLACKLIST -> FLOOR ASC, CLEANLINESS DESC, ID ASC
export const sortToilets = (toilet1, toilet2) => {
  const orderByFavouriteBlacklist =
    getOrder(toilet1.user_preference_type) -
    getOrder(toilet2.user_preference_type);
  const orderByFloorAsc = toilet1.floor - toilet2.floor;
  const orderByCleanDesc = toilet2.cleanliness - toilet1.cleanliness;
  const orderByIdAsc = toilet1.id - toilet2.id;

  if (orderByFavouriteBlacklist !== 0) {
    return orderByFavouriteBlacklist;
  }
  if (orderByFloorAsc !== 0) {
    return orderByFloorAsc;
  }
  if (orderByCleanDesc !== 0) {
    return orderByCleanDesc;
  }
  return orderByIdAsc;
};