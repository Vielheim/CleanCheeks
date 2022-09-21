import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getDistance } from '../../utilities';
import ToiletList from '../ToiletList/ToiletList';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

import './ToiletBottomModal.scss';
import Draggable from 'react-draggable';

const fmtDistance = (distance) =>
  distance >= 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`;
// const distance = getDistance(;
//   latitude,
//   longitude,
//   state.center.current[0],
//   state.center.current[1]
// );

const ToiletBottomModal = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [position, setPosition] = useState({
    x: 0,
    y: 0.6 * window.innerHeight,
  });

  const [showModal, setShowModal] = useState(true);

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

  // Fetch favourited and blacklisted toilets
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
        {isExpanded ? (
          <FiChevronDown
            className="horizontal-bar"
            size={40}
            onClick={onHandleDrag}
          />
        ) : (
          <FiChevronUp
            className="horizontal-bar"
            size={40}
            onClick={onHandleDrag}
          />
        )}
        <Offcanvas.Header>
          <Offcanvas.Title>Favourited Toilets</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ToiletList toilets={[]} isShow={isShow} onCustomHide={onHide} />
        </Offcanvas.Body>
        <Offcanvas.Header>
          <Offcanvas.Title>Blacklisted Toilets</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ToiletList toilets={[]} isShow={isShow} onCustomHide={onHide} />
        </Offcanvas.Body>
      </Offcanvas>
    </Draggable>
  );
};;

export default ToiletBottomModal;
