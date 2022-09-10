import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  Popup,
  Marker,
  TileLayer,
  Circle,
  Polyline,
  ZoomControl,
} from 'react-leaflet';
import SearchBar from '../components/SearchBar';
import icon from '../components/markerIcon';
import { NeighboursIndex } from '../utilities/utilities';
import { INITIAL_FILTER_STATE, OFFLINE_TOILETS } from '../components/constants';
import VENUES from '../data/venues.json';

import './MapPage.scss';

const CIRCLE_FILL_OPTIONS = { fillColor: '#4242a9', color: 'red' };
const POLYLINE_FILL_OPTIONS = { color: '#4242a9' };

const getLocation = ({ location }) => {
  const { x: longitude, y: latitude } = location;
  return [latitude, longitude];
};

const MapPage = () => {
  const [toiletIndex, setToiletIndex] = useState(
    new NeighboursIndex(OFFLINE_TOILETS)
  );
  const [toilets, setToilets] = useState(OFFLINE_TOILETS);
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

  useEffect(() => {
    const cachedToilets = localStorage.getItem('toilets');
    if (cachedToilets === null) {
      // Fetch from API then store
      localStorage.setItem('toilets', JSON.stringify(OFFLINE_TOILETS));
    } else {
      setToilets(JSON.parse(cachedToilets));
    }
  }, []);

  useEffect(() => {
    setVenue(VENUES[filters.search]);
  }, [filters.search]);

  useEffect(() => {
    if (map) {
      map.setView(getLocation(venue), 20);
    }
  }, [venue, map]);

  return (
    <div id="map">
      <MapContainer
        center={getLocation(venue)}
        zoom={20}
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
        {getCloseToilets(toiletIndex, venue, toilets).map(
          ({ latitude, longitude, description }, i) => {
            return (
              <React.Fragment key={i}>
                <Polyline
                  pathOptions={POLYLINE_FILL_OPTIONS}
                  positions={[getLocation(venue), [latitude, longitude]]}
                />
                <Marker position={[latitude, longitude]} icon={icon}>
                  <Popup>{description}</Popup>
                </Marker>
              </React.Fragment>
            );
          }
        )}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default MapPage;
