import VENUES from '../assets/venues.json';
import { ToiletType, Utilities } from '../enums/ToiletEnums';

const getLocation = ({ location }) => {
  const { x: longitude, y: latitude } = location;
  return [latitude, longitude];
};

const clusteriseToilets = (toilets) => {
  const coordsToClusters = {};
  for (const toilet of toilets) {
    const { building, latitude, longitude } = toilet;
    const coordKey = `${latitude} + ${longitude}`;
    if (!coordsToClusters[coordKey]) {
      coordsToClusters[coordKey] = {
        building,
        latitude,
        longitude,
        toilets: [],
      };
    }
    coordsToClusters[coordKey].toilets.push({ ...toilet });
  }

  return Object.values(coordsToClusters);
};

const filterToilets = (toilets, filters) => {
  const { types: typeFilters, utilities: utilitiesFilters } = filters;
  return toilets.filter(
    ({ type, utilities }) =>
      typeFilters.includes(type) &&
      utilities.some((utility) => utilitiesFilters.includes(utility))
  );
};

export const INITIAL_FILTER_STATE = {
  search: 'UT-AUD1',
  types: Object.keys(ToiletType),
  utilities: Object.keys(Utilities),
};

export const INITIAL_TOILET_STATE = {
  toilets: [],
  filteredClusters: [],
  selectedCluster: null,
  isShowCluster: false,
  // current is where the marker will point.
  // map is where the center of the map UI is at.
  center: {
    current:
      JSON.parse(localStorage.getItem('lastCenter')) ??
      getLocation(VENUES['UT-AUD1']),
    map:
      JSON.parse(localStorage.getItem('lastCenter')) ??
      getLocation(VENUES['UT-AUD1']),
  },
  filters: JSON.parse(localStorage.getItem('filters')) ?? INITIAL_FILTER_STATE,
  isTopItemsExpanded: false,
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
      };
    case 'updateSearch':
      const newCenter = getLocation(VENUES[action.payload]);

      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.payload,
        },
        center: {
          current: newCenter,
          map: newCenter,
        },
      };
    case 'expandTopItems':
      return {
        ...state,
        isTopItemsExpanded: action.payload,
      };
    case 'updateFilters':
      const filters = {
        ...state.filters,
        ...action.payload,
      };

      return {
        ...state,
        filters,
        filteredClusters: clusteriseToilets(
          filterToilets(state.toilets, filters)
        ),
      };
    case 'showCluster':
      return {
        ...state,
        isShowCluster: true,
        selectedCluster: state.filteredClusters[action.payload],
      };
    case 'hideCluster':
      return {
        ...state,
        isShowCluster: false,
        selectedCluster: null,
      };
    case 'closeCluster':
      return {
        ...state,
        isShowCluster: false,
      };
    case 'updateToilets':
      const toilets = action.payload;
      return {
        ...state,
        toilets,
        filteredClusters: clusteriseToilets(
          filterToilets(toilets, state.filters)
        ),
      };
    default:
      throw new Error('toiletReducer unexpected action');
  }
};

export default toiletReducer;
