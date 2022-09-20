import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  Circle,
  Polyline,
  ZoomControl,
  useMapEvents,
} from 'react-leaflet';
import SearchBar from '../components/SearchBar';
import ClusterDetails from '../components/ClusterDetails';
import getMarkerIcon from '../components/markerIcon';
import { ToastContext } from '../utilities/context';
import { getDistance } from '../utilities';
import toiletReducer, { INITIAL_TOILET_STATE } from '../reducers/reducer';
import VENUES from '../assets/venues.json';

import './MapPage.scss';
import ToiletControlller from '../api/ToiletController';
import { getToiletsBreakdown } from '../components/shared/Util';

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

  const setToastType = useContext(ToastContext);
  const [state, dispatch] = useReducer(toiletReducer, INITIAL_TOILET_STATE);
  const [map, setMap] = useState(null);

  const fetchCloseToilets = useCallback(
    (coordinates, radius) => {
      ToiletControlller.fetchCloseToilets(coordinates, radius)
        .then((result) => {
          dispatch({ type: 'updateToilets', payload: result.data });
        })
        .catch((e) => {
          console.error(e);
          setToastType('ERROR');
        });
    },
    [setToastType]
  );

  // runs only on first load
  useEffect(() => {
    // const lastCenter = localStorage.getItem('lastCenter');
    // if (lastCenter !== null) {
    //   const parsedCenter = JSON.parse(lastCenter);
    //   dispatch({
    //     type: 'updateCenter',
    //     payload: { current: parsedCenter, map: parsedCenter },
    //   });
    // }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const newCenter = [latitude, longitude];
        dispatch({
          type: 'updateCenter',
          payload: { current: newCenter, map: newCenter },
        });
        localStorage.setItem('lastCenter', JSON.stringify(newCenter));
      });
    }

    window.addEventListener('online', () => {
      if (setToastType) {
        setToastType('ONLINE');
      }
    });
    window.addEventListener('offline', () => {
      if (setToastType) {
        setToastType('OFFLINE');
      }
    });
  }, []);

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
      fetchCloseToilets(state.center.map, radius);
    }
  }, [state.center.map, map]);

  useEffect(() => {
    if (map) {
      map.flyTo(state.center.current, 18);
    }
  }, [state.center.current, map]);

  return (
    <div id="map">
      <MapContainer
        center={state.center.current}
        zoom={18}
        minZoom={17}
        zoomControl={false}
        scrollWheelZoom={false}
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
          className="location-marker"
          center={state.center.current}
          pathOptions={CIRCLE_FILL_OPTIONS}
          radius={10}
        />
        {state.filteredClusters.map((cluster, i) => {
          const { latitude, longitude, toilets } = cluster;
          const isNear =
            getDistance(
              latitude,
              longitude,
              state.center.current[0],
              state.center.current[1]
            ) <= 200;
          const { GOOD, AVERAGE, BAD } = getToiletsBreakdown(toilets);

          return (
            <React.Fragment key={i}>
              {isNear && (
                <Polyline
                  pathOptions={POLYLINE_FILL_OPTIONS}
                  positions={[state.center.current, [latitude, longitude]]}
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
        <ZoomControl position="bottomright" />
        <ClusterDetails state={state} dispatch={dispatch} />
        <PanZoomCenter />
      </MapContainer>
    </div>
  );
};

export default MapPage;
