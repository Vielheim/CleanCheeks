import { TOILET_CLEANLINESS_METADATA, TOILET_QUOTES } from '../constants';
import { getOrder } from '../enums/ToiletPreferenceEnums';

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

// ORDER BY DIST ASC, PREFERENCE DESC (FAV/NONE/BLACKLIST), CLEANLINESS DESC, FLOOR ASC,  ID ASC
export const sortToilets = (toilet1, toilet2, userLocation) => {
  const orderByDistance =
    getDistance(
      toilet1.latitude,
      toilet1.longitude,
      userLocation[0],
      userLocation[1]
    ) -
    getDistance(
      toilet2.latitude,
      toilet2.longitude,
      userLocation[0],
      userLocation[1]
    );
  const orderByFavouriteBlacklist =
    getOrder(toilet1.user_preference_type) -
    getOrder(toilet2.user_preference_type);
  const orderByCleanDesc = toilet2.cleanliness - toilet1.cleanliness;
  const orderByFloorAsc = toilet1.floor - toilet2.floor;
  const orderByIdAsc = toilet1.id - toilet2.id;

  if (orderByDistance !== 0) {
    return orderByDistance;
  }
  if (orderByFavouriteBlacklist !== 0) {
    return orderByFavouriteBlacklist;
  }
  if (orderByCleanDesc !== 0) {
    return orderByCleanDesc;
  }
  if (orderByFloorAsc !== 0) {
    return orderByFloorAsc;
  }
  return orderByIdAsc;
};

export const getDistance = (fLat, fLon, sLat, sLon) => {
  const straight =
    (Math.abs(fLat - sLat) ** 2 + Math.abs(fLon - sLon) ** 2) ** 0.5;
  return (straight * 110000).toFixed(1);
};

export const fmtDistance = (distance) =>
  distance >= 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`;

export const getToiletName = (toilet) => {
  const { floor, building } = toilet;
  const fmtedFloor = floor < 0 ? `B${Math.abs(floor)}` : floor.toString();
  return `${building} ${fmtedFloor}`;
};
