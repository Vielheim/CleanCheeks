import VENUES from '../assets/venues.json';
import { ToiletType, Utilities } from '../enums/ToiletEnums';

const getLocation = ({ location }) => {
  const { x: longitude, y: latitude } = location;
  return [latitude, longitude];
};

const clusteriseToilets = (toilets) => {
  const coordsToClusters = {};
  for (const { building, latitude, longitude, ...others } of toilets) {
    const coordKey = `${latitude} + ${longitude}`;
    if (!coordsToClusters[coordKey]) {
      coordsToClusters[coordKey] = {
        building,
        latitude,
        longitude,
        toilets: [],
      };
    }
    coordsToClusters[coordKey].toilets.push({
      ...others,
    });
  }

  return Object.values(coordsToClusters);
};

const filterToilets = (toilets, filters) => {
  const { types: typeFilters, utilities: utilitiesFilters } = filters;
  return toilets.filter(
    ({ type, utilities }) =>
      typeFilters.includes(type) ||
      utilities.some((utility) => utilitiesFilters.includes(utility))
  );
};

const INITIAL_FILTER_STATE = {
  search: 'UT-AUD1',
  types: [ToiletType.MALE],
  utilities: [Utilities.SHOWERS],
};

export const INITIAL_TOILET_STATE = {
  toilets: [],
  filteredClusters: [],
  selectedCluster: null,
  isShowCluster: false,
  // current is where the marker will point.
  // map is where the center of the map UI is at.
  center: {
    current: JSON.parse(localStorage.getItem('lastCenter')) ?? getLocation(VENUES['UT-AUD1']),
    map: JSON.parse(localStorage.getItem('lastCenter')) ?? getLocation(VENUES['UT-AUD1']),
  },
  filters: JSON.parse(localStorage.getItem('filters')) ?? INITIAL_FILTER_STATE,
};

const toiletReducer = (state, action) => {
  switch (action.type) {
    case 'updateCenter':
      const newCenterObj = {
        ...state.center,
        ...action.payload,
      };
      return {
        ...state,
        center: newCenterObj,
      }
    case 'updateFilters':
      const filters = {
        ...state.filters,
        ...action.payload,
      };
      const newCenter = getLocation(VENUES[filters.search]);
    
      return {
        ...state,
        filters,
        filteredClusters: clusteriseToilets(filterToilets(state.toilets, filters)),
        center: {
          current: newCenter,
          map: newCenter,
        },
      }
    case 'showCluster':
      return {
        ...state,
        isShowCluster: true,
        selectedCluster: state.filteredClusters[action.payload],
      }
    case 'hideCluster':
      return {
        ...state,
        isShowCluster: false,
        selectedCluster: null,
      }
    case 'closeCluster':
      return {
        ...state,
        isShowCluster: false,
      }
    case 'updateToilets':
      const toilets = action.payload;
      return {
        ...state,
        toilets,
        filteredClusters: clusteriseToilets(filterToilets(toilets, state.filters)),
      }
    default:
      throw new Error('toiletReducer unexpected action');
  }
};

export default toiletReducer;