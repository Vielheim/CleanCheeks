import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import { NeighboursIndex } from '../utilities/utilities';

// Fetch from localStorage in the future
const TOILETS = [
  {
    building: 'BIZ1',
    description: 'Behind the air-con units',
    floor: 1,
    longitude: 1.2924024167154038,
    latitude: 103.77438630260782,
    num_seats: 3,
    num_squats: 3,
    cleanliness: 0,
    type: 'MALE',
    utilities: ['FRAGRANCE', 'BIDETS', 'HOOKS'],
  },
  {
    building: 'BIZ1',
    description: 'Behind the vending machines',
    floor: 2,
    longitude: 1.2924024167154038,
    latitude: 103.77438630260782,
    num_seats: 3,
    num_squats: 3,
    cleanliness: 0,
    type: 'MALE',
    utilities: ['FRAGRANCE', 'BIDETS', 'HOOKS'],
  },
  {
    building: 'BIZ1',
    description: 'Beside the library',
    floor: 3,
    longitude: 1.2924024167154038,
    latitude: 103,
    num_seats: 3,
    num_squats: 3,
    cleanliness: 0,
    type: 'MALE',
    utilities: ['FRAGRANCE', 'BIDETS', 'HOOKS'],
  },
];

// Will be a local state updated by the SearchBar component once linked up
const LOCATION = [1.2924024167154038, 103.77438630260782];
const getCloseToilets = (index, coordinates, toilets) => {
  const [longitude, latitude] = coordinates;
  return index.query(longitude, latitude).map((i) => toilets[i]);
};

const MapPage = () => {
  const [toiletIndex, setToiletIndex] = useState(new NeighboursIndex(TOILETS));

  useEffect(() => {
    if (localStorage.getItem('toilets') === null) {
      // Fetch from API then store
      localStorage.setItem('toilets', JSON.stringify(TOILETS));
    } else {
    }
  }, []);

  return (
    <Map
      location={LOCATION}
      toilets={getCloseToilets(toiletIndex, LOCATION, TOILETS)}
    />
  );
};

export default MapPage;
