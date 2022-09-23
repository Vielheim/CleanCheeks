import React, { useCallback, useContext, useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { GrFormPreviousLink } from 'react-icons/gr';
import ToiletControlller from '../../api/ToiletController';
import ToiletDetailBody from './ToiletDetailBody';
import ToiletLoadingScreen from './ToiletLoadingScreen';

import {
  getCleanlinessMetadata,
  getToiletName,
  getToiletQuote,
} from '../../utilities/Util';
import PreferenceIcons from './PreferenceIcons';
import styles from './ToiletDetail.module.scss';
import { ToastContext } from '../../utilities/context';
import ToiletErrorScreen from './ToiletErrorScreen';

const PAGE_STATE = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  READY: 'READY',
};

const ToiletDetail = ({ toilet, isShow, onBack, onHide }) => {
  const { id, description, utilities } = toilet;
  const setToastType = useContext(ToastContext);

  const [pageState, setPageState] = useState(PAGE_STATE.LOADING);
  const [toiletQuote, setToiletQuote] = useState(
    'Haha our website clogged just like the toilet cannot flush'
  );
  const [cleanlinessMetadata, setCleanlinessMetadata] = useState({
    text: 'BAD',
    type: 'danger',
  });
  const [percentageBeat, setPercentageBeat] = useState(0);

  const updateToiletRank = useCallback(async () => {
    await ToiletControlller.getToiletRank(id)
      .then((result) => {
        const cleanliness = result.data.toilet.cleanliness;
        setPercentageBeat(result.data.percentageBeat);
        setCleanlinessMetadata(getCleanlinessMetadata(cleanliness));
        toilet.cleanliness = cleanliness;

        const newToiletQuote = getToiletQuote(cleanliness, id);
        setToiletQuote(newToiletQuote);
      })
      .catch((e) => {
        setCleanlinessMetadata(getCleanlinessMetadata(toilet.cleanliness));
        const newToiletQuote = getToiletQuote(toilet.cleanliness, id);
        setToiletQuote(newToiletQuote);
        setPercentageBeat(null);

        setToastType('ERROR');
      })
      .finally(() => {
        setPageState(PAGE_STATE.READY);
      });
  }, [id, setToastType, toilet]);

  const onUpdateToiletPreference = (preference) => {
    toilet.user_preference_type = preference;
  };

  useEffect(() => {
    updateToiletRank();
  }, [updateToiletRank]);

  const getOffCanvasBody = () => {
    if (pageState === PAGE_STATE.LOADING) {
      return <ToiletLoadingScreen />;
    } else if (pageState === PAGE_STATE.ERROR) {
      return <ToiletErrorScreen />;
    }

    return (
      <ToiletDetailBody
        id={id}
        toiletQuote={toiletQuote}
        cleanlinessMetadata={cleanlinessMetadata}
        percentageBeat={percentageBeat}
        updateToiletRank={updateToiletRank}
        utilities={utilities}
      />
    );
  };

  return (
    <Offcanvas
      className={styles['offcanvas-container']}
      placement="bottom"
      show={isShow}
      onHide={onHide}
    >
      <Offcanvas.Header>
        <GrFormPreviousLink onClick={onBack} size={28} />
        <Offcanvas.Title className="text-center">
          <p className="m-0">{getToiletName(toilet)}</p>
          <p className="m-0 text-muted fs-6">{description}</p>
        </Offcanvas.Title>
        <PreferenceIcons
          toiletId={id}
          initPreferenceType={toilet.user_preference_type}
          onSetPreferenceType={onUpdateToiletPreference}
        />
      </Offcanvas.Header>
      <Offcanvas.Body>{getOffCanvasBody()}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default ToiletDetail;
