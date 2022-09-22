import React, { useContext, useState } from 'react';
import ToiletDetail from '../ToiletDetail/ToiletDetail';

import { sortToilets } from '../../utilities/Util';
import ToiletCard from './ToiletCard';
import { UserContext } from '../../utilities/context';
import LoginButton from '../LoginButton/LoginButton';
import styles from './ToiletList.module.scss';

const ToiletList = ({ state, toilets, isShow, onCustomHide, tagType }) => {
  const [selectedToilet, setSelectedToilet] = useState(null);
  const { user } = useContext(UserContext);

  const onHide = () => {
    setSelectedToilet(null);
    onCustomHide();
  };

  if (!user) {
    return <LoginButton />;
  }

  if (toilets == null || toilets.length === 0) {
    return <p className={styles['no-toilets-text']}>Nothing to see here...</p>;
  }

  if (selectedToilet != null) {
    return (
      <ToiletDetail
        building={selectedToilet.building}
        toilet={selectedToilet}
        isShow={isShow}
        onBack={() => setSelectedToilet(null)}
        onHide={onHide}
      />
    );
  }

  return (
    <>
      {toilets
        .sort((t1, t2) => sortToilets(t1, t2, state.center.current))
        .map((toilet) => (
          <ToiletCard
            key={toilet.id}
            toilet={toilet}
            onSelect={setSelectedToilet}
            tagType={tagType}
            userLocation={state.center.current}
          />
        ))}
    </>
  );
};

export default ToiletList;
