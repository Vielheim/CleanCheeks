import React, { useCallback, useContext, useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Draggable from 'react-draggable';
import { FaHeart } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { TiCancel } from 'react-icons/ti';
import { UserContext } from '../../utilities/context';
import ToiletList, { DISTANCE_KEY } from '../ToiletList/ToiletList';
import styles from './ToiletPreferencesModal.module.scss';
import { emptyFunction } from '../../utilities/Util';

const ToiletPreferencesModal = ({ state }) => {
  const isMobile = window.innerWidth <= 768;
  const yOffset =
    0.8 * document.documentElement.clientHeight - (isMobile ? 70 : 80);

  const { toiletPreferences } = useContext(UserContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: yOffset,
  });

  const closeModal = useCallback(() => {
    setPosition({
      x: 0,
      y: yOffset,
    });
    setIsExpanded(false);
  }, [yOffset]);

  const openModal = () => {
    setPosition({
      x: 0,
      y: 0,
    });
    setIsExpanded(true);
  };

  const onHandleDrag = () => {
    if (isExpanded) {
      closeModal();
    } else {
      openModal();
    }
  };

  useEffect(() => {
    if (state.isTopItemsExpanded) {
      closeModal();
    }
  }, [closeModal, state.isTopItemsExpanded]);

  const prop = {
    backdrop: false,
  };

  return (
    <Draggable axis="y" position={position} onStart={() => false}>
      <Offcanvas
        enforceFocus={false}
        className={styles['bottom-modal']}
        placement="bottom"
        show={true}
        onHide={emptyFunction}
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
        {isExpanded && (
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
              isShow={isExpanded}
              onCustomHide={closeModal}
              tagType="distance"
            />
            <Offcanvas.Title className="mb-3 mt-5 fw-bolder">
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
              isShow={isExpanded}
              onCustomHide={closeModal}
              tagType={DISTANCE_KEY}
            />
          </Offcanvas.Body>
        )}
      </Offcanvas>
    </Draggable>
  );
};

export default ToiletPreferencesModal;
