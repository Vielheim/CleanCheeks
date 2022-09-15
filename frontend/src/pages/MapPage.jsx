import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  Circle,
  Polyline,
  ZoomControl,
} from 'react-leaflet';
import SearchBar from '../components/SearchBar';
import ClusterDetails from '../components/ClusterDetails';
import getMarkerIcon from '../components/markerIcon';
import { NeighboursIndex } from '../utilities/utilities';
import { INITIAL_FILTER_STATE, OFFLINE_TOILETS } from '../components/constants';
import VENUES from '../assets/venues.json';

import './MapPage.scss';

const CIRCLE_FILL_OPTIONS = { fillColor: '#4242a9', color: 'red' };
const POLYLINE_FILL_OPTIONS = { color: '#4242a9' };

const getLocation = ({ location }) => {
  const { x: longitude, y: latitude } = location;
  return [latitude, longitude];
};

const getNumCleanToilets = (toilets) =>
  toilets.reduce(
    (prev, { cleanliness }) => (cleanliness >= 0 ? 1 + prev : prev),
    0
  );

const clusteriseToilets = (toilets) => {
  const coordsToClusters = {};
  for (const { building, latitude, longitude, ...others } of toilets) {
    const coordKey = `{latitude} + {longitude}`;
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

const MapPage = () => {
  const mapMarkerHandlers = {
    click: (e) => {
      const clusterIndex = e.target.options.data;
      setIsShowCluster(true);
      setSelectedCluster(filteredClusters[clusterIndex]);
    },
  };

  const [toiletIndex, setToiletIndex] = useState(
    new NeighboursIndex(OFFLINE_TOILETS)
  );
  const [toilets, setToilets] = useState(OFFLINE_TOILETS);
  const [isShowCluster, setIsShowCluster] = useState(false);
  const [filteredClusters, setFilteredClusters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [venue, setVenue] = useState(VENUES['UT-AUD1']);
  const [filters, setFilters] = useState(INITIAL_FILTER_STATE);
  const [map, setMap] = useState(null);

  const getCloseToilets = (index, venue, toilets) => {
    const [latitude, longitude] = getLocation(venue);
    return index
      .query(latitude, longitude)
      .map((i) => toilets[i])
      .filter(({ type }) => {
        return type === filters.gender;
      });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const newVenue = VENUES[filters.search];
    const closeToilets = getCloseToilets(toiletIndex, newVenue, toilets);

    setVenue(newVenue);
    setFilteredClusters(clusteriseToilets(closeToilets));
  }, [filters.search]);

  useEffect(() => {
    if (map) {
      map.setView(getLocation(venue), 18);
    }
  }, [venue, map]);

  return (
    <div id="map">
      <MapContainer
        center={getLocation(venue)}
        zoom={18}
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
          center={getLocation(venue)}
          pathOptions={CIRCLE_FILL_OPTIONS}
          radius={10}
        />
        {filteredClusters.map((cluster, i) => {
          const { latitude, longitude, toilets } = cluster;
          return (
            <React.Fragment key={i}>
              <Polyline
                pathOptions={POLYLINE_FILL_OPTIONS}
                positions={[getLocation(venue), [latitude, longitude]]}
              />
              <Marker
                position={[latitude, longitude]}
                icon={getMarkerIcon(
                  toilets.length,
                  getNumCleanToilets(toilets)
                )}
                data={i}
                eventHandlers={mapMarkerHandlers}
              />
            </React.Fragment>
          );
        })}
        <ZoomControl position="bottomright" />
        {selectedCluster && (
          <ClusterDetails
            cluster={selectedCluster}
            isShow={isShowCluster}
            setIsShow={setIsShowCluster}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;
