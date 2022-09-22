import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { fmtDistance, getDistance } from '../../utilities/Util';
import ToiletList, { PREFERENCE_KEY } from '../ToiletList/ToiletList';

import styles from './ClusterDetails.module.scss';

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
      className={styles['offcanvas-container']}
      placement="bottom"
      show={state.isShowCluster}
      onHide={() => dispatch({ type: 'closeCluster' })}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{`${numToilets} toilet${
          numToilets > 1 ? 's' : ''
        } are at ${building}`}</Offcanvas.Title>
      </Offcanvas.Header>
      <div className={styles['distance']}>
        <strong>{fmtDistance(distance)}</strong> away from your location
      </div>
      <Offcanvas.Body>
        <ToiletList
          state={state}
          toilets={toilets}
          isShow={state.isShowCluster}
          onCustomHide={() => dispatch({ type: 'closeCluster' })}
          tagType={PREFERENCE_KEY}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ClusterDetails;
