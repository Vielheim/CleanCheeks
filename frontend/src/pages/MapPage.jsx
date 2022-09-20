import React, { useState, useEffect, useCallback, useContext } from 'react';
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
import { INITIAL_FILTER_STATE, OFFLINE_TOILETS } from '../constants';
import { ToastContext } from '../utilities/context';
import { getDistance } from '../utilities';
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

const MapPage = () => {
  const PanZoomCenter = () => {
    const onPanZoomEnd = (map) => {
      const { lat, lng } = map.getCenter();
      setCenter({
        ...center,
        map: [lat, lng],
      });
    };
    const map = useMapEvents({
      dragend: () => {
        onPanZoomEnd(map);
      },
      zoomend: () => {
        onPanZoomEnd(map);
      },
    });
    return null;
  };

  const fetchCloseToilets = useCallback((coordinates, radius) => {
    ToiletControlller.fetchCloseToilets(coordinates, radius)
      .then((result) => {
        setToilets(result.data);
        setFilteredClusters(
          clusteriseToilets(filterToilets(result.data, filters))
        );
      })
      .catch((e) => {
        console.error(e);
        setToastType('ERROR');
      });
  }, []);

  const mapMarkerHandlers = {
    click: (e) => {
      const clusterIndex = e.target.options.data;
      setIsShowCluster(true);
      setSelectedCluster(filteredClusters[clusterIndex]);
    },
  };

  const setToastType = useContext(ToastContext);
  const [toilets, setToilets] = useState(OFFLINE_TOILETS);
  const [isShowCluster, setIsShowCluster] = useState(false);
  const [filteredClusters, setFilteredClusters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(null);
  // current is where the marker will point.
  // map is where the center of the map UI is at.
  const [center, setCenter] = useState({
    current: getLocation(VENUES['UT-AUD1']),
    map: getLocation(VENUES['UT-AUD1']),
  });
  const [filters, setFilters] = useState(INITIAL_FILTER_STATE);
  const [map, setMap] = useState(null);

  // runs only on first load
  useEffect(() => {
    const lastCenter = localStorage.getItem('lastCenter');
    if (lastCenter !== null) {
      const parsedCenter = JSON.parse(lastCenter);
      setCenter({
        current: parsedCenter,
        map: parsedCenter,
      });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const newCenter = [latitude, longitude];
        setCenter({
          current: newCenter,
          map: newCenter,
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
      fetchCloseToilets(center.map, radius);
    }
  }, [center.map, fetchCloseToilets, map]);

  useEffect(() => {
    const newCenter = getLocation(VENUES[filters.search]);
    setCenter({
      current: newCenter,
      map: newCenter,
    });
  }, [filters.search]);

  useEffect(() => {
    setFilteredClusters(clusteriseToilets(filterToilets(toilets, filters)));
  }, [filters.types, filters.utilities]);

  useEffect(() => {
    if (map) {
      map.flyTo(center.current, 18);
    }
  }, [center.current, map]);

  return (
    <div id="map">
      <MapContainer
        center={center.current}
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
          setFilters={setFilters}
          filters={filters}
          venues={VENUES}
        />
        <Circle
          className="location-marker"
          center={center.current}
          pathOptions={CIRCLE_FILL_OPTIONS}
          radius={10}
        />
        {filteredClusters.map((cluster, i) => {
          const { latitude, longitude, toilets } = cluster;
          const isNear =
            getDistance(
              latitude,
              longitude,
              center.current[0],
              center.current[1]
            ) <= 200;
          const breakdown = getToiletsBreakdown(toilets);
          return (
            <React.Fragment key={i}>
              {isNear && (
                <Polyline
                  pathOptions={POLYLINE_FILL_OPTIONS}
                  positions={[center.current, [latitude, longitude]]}
                />
              )}
              <Marker
                position={[latitude, longitude]}
                icon={getMarkerIcon(toilets.length, breakdown.GOOD, !isNear)}
                data={i}
                eventHandlers={mapMarkerHandlers}
              />
            </React.Fragment>
          );
        })}
        <ZoomControl position="bottomright" />
        {selectedCluster && (
          <ClusterDetails
            currLocation={center.current}
            cluster={selectedCluster}
            isShow={isShowCluster}
            setIsShow={setIsShowCluster}
          />
        )}
        <PanZoomCenter />
      </MapContainer>
    </div>
  );
};

export default MapPage;
