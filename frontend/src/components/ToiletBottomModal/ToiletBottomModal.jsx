import React, { useCallback, useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ToiletList from '../ToiletList/ToiletList';

import Draggable from 'react-draggable';
import ToiletControlller from '../../api/ToiletController';
import './ToiletBottomModal.scss';

// const distance = getDistance(;
//   latitude,
//   longitude,
//   state.center.current[0],
//   state.center.current[1]
// );

// TODO: Sync blacklisted and favourited toilets
const ToiletBottomModal = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0.6 * window.innerHeight,
  });
  const [showModal, setShowModal] = useState(true);
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
        y: 0.1 * window.innerHeight,
      });
      setIsExpanded(true);
    }
  };

  const isShow = true;
  const onHide = () => {};

  const prop = {
    backdrop: false,
  };

  return (
    <Draggable
      axis="y"
      position={position}
      bounds={{
        top: 0.1 * window.innerHeight,
        bottom: 0.6 * window.innerHeight,
      }}
      onStart={() => false}
    >
      <Offcanvas
        className="bottom-modal"
        placement="bottom"
        show={showModal}
        onHide={setShowModal}
        {...prop}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>Favourited Toilets</Offcanvas.Title>
          {isExpanded ? (
            <FiChevronDown
              className="horizontal-bar"
              size={28}
              onClick={onHandleDrag}
            />
          ) : (
            <FiChevronUp
              className="horizontal-bar"
              size={28}
              onClick={onHandleDrag}
            />
          )}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ToiletList
            toilets={favouritedToilets}
            isShow={isShow}
            onCustomHide={onHide}
          />
        </Offcanvas.Body>
        <Offcanvas.Header>
          <Offcanvas.Title>Blacklisted Toilets</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ToiletList
            toilets={blacklistedToilets}
            isShow={isShow}
            onCustomHide={onHide}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </Draggable>
  );
};

export default ToiletBottomModal;
