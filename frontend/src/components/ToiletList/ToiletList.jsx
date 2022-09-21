import React, { useState } from 'react';
import ToiletDetail from '../ToiletDetail/ToiletDetail';

import { sortToilets } from '../../utilities/Util';
import ToiletCard from './ToiletCard';

const ToiletList = ({ state, toilets, isShow, onCustomHide, tagType }) => {
  const [selectedToilet, setSelectedToilet] = useState(null);

  const onHide = () => {
    setSelectedToilet(null);
    onCustomHide();
  };

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
        .filter(({ floor }) => floor < 8 && floor !== 0)
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
