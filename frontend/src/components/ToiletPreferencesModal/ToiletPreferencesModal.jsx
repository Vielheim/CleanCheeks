import React, { useContext, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Draggable from 'react-draggable';
import { FaHeart } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { TiCancel } from 'react-icons/ti';
import { UserContext } from '../../utilities/context';
import ToiletList from '../ToiletList/ToiletList';
import styles from './ToiletPreferencesModal.module.scss';

/* 
TODO: Show login button when user is not logged in
 */
const ToiletPreferencesModal = ({ state }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0.4 * window.innerHeight,
  });
  const { toiletPreferences } = useContext(UserContext);

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
          <Offcanvas.Title className={`${styles['header-title']}`}>
            Your favourites / blacklists
          </Offcanvas.Title>
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
          <Offcanvas.Title className="mb-3 fw-bolder">
            <FaHeart
              className={styles['favourite-icon']}
              color="#D2222D"
              size={22}
            />
            Favourited Toilets
          </Offcanvas.Title>
          <ToiletList
            state={state}
            toilets={toiletPreferences.favouritedToilets}
            isShow={true}
            onCustomHide={onHide}
            tagType="distance"
          />
          <Offcanvas.Title className="mb-3 mt-5 ">
            <TiCancel
              className={styles['blacklisted-icon']}
              color="#453F41"
              size={28}
            />
            Blacklisted Toilets
          </Offcanvas.Title>
          <ToiletList
            state={state}
            toilets={toiletPreferences.blacklistedToilets}
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
