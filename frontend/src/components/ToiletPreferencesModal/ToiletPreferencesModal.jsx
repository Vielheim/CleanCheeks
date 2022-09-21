import React, { useCallback, useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Draggable from 'react-draggable';
import { FaHeart } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { TiCancel } from 'react-icons/ti';
import ToiletControlller from '../../api/ToiletController';
import ToiletList from '../ToiletList/ToiletList';
import styles from './ToiletPreferencesModal.module.scss';

// const distance = getDistance(;
//   latitude,
//   longitude,
//   state.center.current[0],
//   state.center.current[1]
// );

/* 
TODO: Sync blacklisted and favourited toilets when user favourites and blacklist toilets
TODO: Show login button when user is not logged in
TODO: Update UI
- Apply gray background to toilet detail (for visual hierarchy)
 */
const ToiletPreferencesModal = ({ state }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0.4 * window.innerHeight,
  });
  const [blacklistedToilets, setBlacklistedToilets] = useState([]);
  const [favouritedToilets, setFavouritedToilets] = useState([]);

  const fetchToiletsWithPreferences = useCallback(() => {
    ToiletControlller.fetchToiletWithUserPreferences()
      .then((result) => {
        setBlacklistedToilets(result.data.blacklistedToilets);
        setFavouritedToilets(result.data.favouritedToilets);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchToiletsWithPreferences();
  }, [fetchToiletsWithPreferences]);

  const onHandleDrag = (e) => {
    if (isExpanded) {
      setPosition({
        x: 0,
        y: 0.6 * window.innerHeight,
      });
      setIsExpanded(false);
    } else {
      setPosition({
        x: 0,
        y: 0,
      });
      setIsExpanded(true);
    }
  };

  const onHide = () => {};

  const prop = {
    backdrop: false,
  };

  return (
    <Draggable axis="y" position={position} onStart={() => false}>
      <Offcanvas
        className={styles['bottom-modal']}
        placement="bottom"
        show={true}
        onHide={onHide}
        {...prop}
      >
        <Offcanvas.Header>
          <div></div>
          {isExpanded ? (
            <FiChevronDown
              className={styles['modal-chevron']}
              size={28}
              onClick={onHandleDrag}
            />
          ) : (
            <FiChevronUp
              className={styles['modal-chevron']}
              size={28}
              onClick={onHandleDrag}
            />
          )}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Offcanvas.Title className={`${styles['title']} mb-3 fw-bolder`}>
            <FaHeart
              className={styles['favourite-icon']}
              color="#D2222D"
              size={22}
            />
            Favourited Toilets
          </Offcanvas.Title>
          <ToiletList
            state={state}
            toilets={favouritedToilets}
            isShow={true}
            onCustomHide={onHide}
            tagType="distance"
          />
          <Offcanvas.Title className={`${styles['title']} mb-3 mt-5 fw-bolder`}>
            <TiCancel
              className={styles['blacklisted-icon']}
              color="#453F41"
              size={28}
            />
            Blacklisted Toilets
          </Offcanvas.Title>
          <ToiletList
            state={state}
            toilets={blacklistedToilets}
            isShow={true}
            onCustomHide={onHide}
            tagType="distance"
          />
        </Offcanvas.Body>
      </Offcanvas>
    </Draggable>
  );
};

export default ToiletPreferencesModal;
