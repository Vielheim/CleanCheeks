import React, { useCallback, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import ToiletPreferenceControlller from '../../api/ToiletPreferenceController';
import { PreferenceType } from '../../enums/ToiletPreferenceEnums';

const PreferenceIcons = ({
  toiletId,
  initPreferenceType,
  onSetPreferenceType,
}) => {
  const [preference, setPreference] = useState(initPreferenceType);

  const updateToiletPreference = useCallback(
    async (type) => {
      await ToiletPreferenceControlller.updateToiletPreference(toiletId, type)
        .then((result) => {
          setPreference(result.data.type);
          onSetPreferenceType(result.data.type);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [toiletId, onSetPreferenceType]
  );

  const onClickFavourite = useCallback(() => {
    updateToiletPreference(PreferenceType.FAVOURITE);
  }, [updateToiletPreference]);

  const onClickBlacklist = useCallback(() => {
    updateToiletPreference(PreferenceType.BLACKLIST);
  }, [updateToiletPreference]);

  return (
    <div>
      <FaHeart
        className="favourite-icon"
        color={preference === PreferenceType.FAVOURITE ? 'red' : 'lightgrey'}
        size={20}
        onClick={onClickFavourite}
      />
      <TiCancel
        size={28}
        color={preference === PreferenceType.BLACKLIST ? 'black' : 'lightgrey'}
        onClick={onClickBlacklist}
      />
    </div>
  );
};

export default PreferenceIcons;
