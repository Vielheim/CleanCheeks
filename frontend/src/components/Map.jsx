import React from 'react';
import { MapContainer } from 'react-leaflet/MapContainer';
import { Popup } from 'react-leaflet/Popup';
import { Marker } from 'react-leaflet/Marker';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Circle } from 'react-leaflet/Circle';
import icon from './markerIcon';

const CIRCLE_FILL_OPTIONS = { fillColor: '#4242a9' };

const Map = ({ location, toilets }) => {
  return (
    <div id="map">
      <MapContainer center={location} zoom={20} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={location}
          pathOptions={CIRCLE_FILL_OPTIONS}
          radius={10}
        />
        {toilets.map(({ longitude, latitude, description }, i) => {
          return (
            <Marker key={i} position={[longitude, latitude]} icon={icon}>
              <Popup>{description}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
