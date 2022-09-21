import React, { useCallback, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import ToiletPreferenceControlller from '../../api/ToiletPreferenceController';
import { PreferenceType } from '../../enums/ToiletPreferenceEnums';
import { AuthContext } from '../../utilities/context';

const PreferenceIcons = ({
  toiletId,
  initPreferenceType,
  onSetPreferenceType,
}) => {
  const [preference, setPreference] = useState(initPreferenceType);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const updateToiletPreference = useCallback(
    async (type) => {
      await ToiletPreferenceControlller.updateToiletPreference(toiletId, type)
        .then((result) => {
          setPreference(result.data.type);
          onSetPreferenceType(result.data.type);
        })
        .catch((e) => {
          setUser(false);
          navigate('/');
        });
    },
    [toiletId, onSetPreferenceType, setUser, navigate]
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
