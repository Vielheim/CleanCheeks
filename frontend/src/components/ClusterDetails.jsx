import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getDistance } from '../utilities';
import ToiletList from './ToiletList/ToiletList';

import './ClusterDetails.scss';

const fmtDistance = (distance) =>
  distance >= 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`;

const ClusterDetails = ({ state, dispatch }) => {
  const { building, latitude, longitude, toilets } = state.selectedCluster;
  const numToilets = toilets.length;
  const distance = getDistance(
    latitude,
    longitude,
    state.center.current[0],
    state.center.current[1]
  );

  return (
    <Offcanvas
      className="offcanvas-container"
      placement="bottom"
      show={state.isShowCluster}
      onHide={() => dispatch({ type: 'closeCluster' })}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{`${numToilets} toilet${
          numToilets > 1 ? 's' : ''
        } are at ${building}`}</Offcanvas.Title>
      </Offcanvas.Header>
      <div className="distance">
        <strong>{fmtDistance(distance)}</strong> away from your location
      </div>
      <Offcanvas.Body>
        <ToiletList toilets={toilets} state={state} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ClusterDetails;
