import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import VENUES from '../assets/venues.json';
import ClusterDetails from '../components/ClusterDetail/ClusterDetails';
import getMarkerIcon from '../components/markerIcon';
import SearchBar from '../components/SearchBar';
import toiletReducer, { INITIAL_TOILET_STATE } from '../reducers/reducer';
import { getDistance } from '../utilities/Util';

import ToiletControlller from '../api/ToiletController';
import ToiletPreferencesModal from '../components/ToiletPreferencesModal/ToiletPreferencesModal';
import ToiletsLoadingPlaceholder from '../components/ToiletsLoadingPlaceholder';
import { USER_ID_KEY } from '../constants';
import { getLocalStorageValue } from '../utilities/localStorage';
import { getToiletsBreakdown } from '../utilities/Util';
import styles from './MapPage.module.scss';

const CIRCLE_FILL_OPTIONS = {
  fillOpacity: 1,
  fillColor: '#4242a9',
  color: '#4242a9',
};
const POLYLINE_FILL_OPTIONS = { color: '#4242a9' };

const MapPage = () => {
  const PanZoomCenter = () => {
    const onPanZoomEnd = (map) => {
      const { lat, lng } = map.getCenter();
      dispatch({ type: 'updateCenter', payload: { map: [lat, lng] } });
    };
    const map = useMapEvents({
      dragend: () => {
        onPanZoomEnd(map);
      },
    });
    return null;
  };

  const mapMarkerHandlers = {
    click: (e) => {
      const clusterIndex = e.target.options.data;
      dispatch({ type: 'showCluster', payload: clusterIndex });
    },
  };

  const [isLoadingToilets, setIsLoadingToilets] = useState(true);
  const [state, dispatch] = useReducer(toiletReducer, INITIAL_TOILET_STATE);
  const [map, setMap] = useState(null);
  const userId = getLocalStorageValue(USER_ID_KEY);

  const fetchCloseToilets = useCallback(
    (coordinates, radius) => {
      ToiletControlller.fetchCloseToilets(coordinates, radius, userId)
        .then((result) => {
          dispatch({ type: 'updateToilets', payload: result.data });
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setIsLoadingToilets(false);
        });
    },
    [userId]
  );

  // runs only on first load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const newCenter = [latitude, longitude];
          dispatch({
            type: 'updateCenter',
            payload: { current: newCenter },
          });
          localStorage.setItem('lastCenter', JSON.stringify(newCenter));
        },
        (error) => {
          // eslint-disable-next-line default-case
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log('Permission denied');
              break;
            case error.POSITION_UNAVAILABLE:
              console.log('Position unavailable');
              break;
            case error.TIMEOUT:
              console.log('Timeout');
              break;
            default:
              break;
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(state.filters));
  }, [state.filters]);

  useEffect(() => {
    let radius = 400;
    // get the radius around you that corresponds to 70% of
    // the map's min(height, width) if it is loaded
    if (map) {
      const bounds = map.getBounds();
      const width = bounds.getEast() - bounds.getWest();
      const height = bounds.getNorth() - bounds.getSouth();
      // minimum distance apart in metres
      const minDistance = (Math.min(width, height) * 110000) / 2;
      radius = minDistance * 0.7;
      setIsLoadingToilets(true);
      fetchCloseToilets(state.center.map, radius);
    }
  }, [state.center.map, map, fetchCloseToilets]);

  useEffect(() => {
    localStorage.setItem('lastCenter', JSON.stringify(state.center.current));
    if (map) {
      map.flyTo(state.center.map);
    }
  }, [state.center, map]);

  return (
    <div id="map">
      <MapContainer
        center={state.center.current}
        zoom={18}
        minZoom={17}
        zoomControl={false}
        scrollWheelZoom={true}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchBar
          className="leaflet-top searchbar-row"
          state={state}
          dispatch={dispatch}
          venues={VENUES}
        />
        <Circle
          className={styles['location-marker']}
          center={
            state.filters.search ? state.center.venue : state.center.current
          }
          pathOptions={CIRCLE_FILL_OPTIONS}
          radius={10}
        />
        {isLoadingToilets && <ToiletsLoadingPlaceholder />}

        {state.filteredClusters.map((cluster, i) => {
          const { latitude, longitude, toilets } = cluster;
          const center = state.filters.search
            ? state.center.venue
            : state.center.current;
          const isNear =
            getDistance(latitude, longitude, center[0], center[1]) <= 200;
          const { GOOD, AVERAGE, BAD } = getToiletsBreakdown(toilets);

          return (
            <React.Fragment key={i}>
              {isNear && (
                <Polyline
                  pathOptions={POLYLINE_FILL_OPTIONS}
                  positions={[center, [latitude, longitude]]}
                />
              )}
              <Marker
                position={[latitude, longitude]}
                icon={getMarkerIcon(GOOD, AVERAGE, BAD, !isNear)}
                data={i}
                eventHandlers={mapMarkerHandlers}
              />
            </React.Fragment>
          );
        })}
        {state.selectedCluster !== null && (
          <ClusterDetails state={state} dispatch={dispatch} />
        )}
        {<ToiletPreferencesModal state={state} />}
        <PanZoomCenter />
      </MapContainer>
    </div>
  );
};

export default MapPage;
