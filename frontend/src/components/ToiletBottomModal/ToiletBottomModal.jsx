import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getDistance } from '../../utilities';
import ToiletList from '../ToiletList/ToiletList';

import './ToiletBottomModal.scss';
import Draggable from 'react-draggable';

const fmtDistance = (distance) =>
  distance >= 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`;

const ToiletBottomModal = () => {
  // const distance = getDistance(
  //   latitude,
  //   longitude,
  //   state.center.current[0],
  //   state.center.current[1]
  // );

  const [dragState, setDragState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: -400,
      y: 200,
    },
  });

  const [showModal, setShowModal] = useState(true);

  const handleDrag = (e, ui) => {
    if (ui.y <= 200) {
      return;
    }
    setDragState((prev) => ({
      ...prev,
      deltaPosition: {
        x: prev.deltaPosition.x + ui.deltaX,
        y: prev.deltaPosition.y + ui.deltaY,
      },
    }));
  };

  const h = window.innerHeight;

  const isShow = true;
  const onHide = () => {};

  const prop = {
    backdrop: false,
  };

  return (
    <Draggable
      axis="y"
      bounds={{ top: 0.6 * h, bottom: 0.5 * h }}
      onDrag={handleDrag}
    >
      <Offcanvas
        className="bottom-modal"
        placement="bottom"
        show={showModal}
        onHide={setShowModal}
        {...prop}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Favourited Toilets</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ToiletList toilets={[]} isShow={isShow} onCustomHide={onHide} />
        </Offcanvas.Body>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Blacklisted Toilets</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ToiletList toilets={[]} isShow={isShow} onCustomHide={onHide} />
        </Offcanvas.Body>
      </Offcanvas>
    </Draggable>
  );
};

export default ToiletBottomModal;
