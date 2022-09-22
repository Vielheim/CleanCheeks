import React, { useCallback, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import ToiletPreferenceControlller from '../../api/ToiletPreferenceController';
import { PreferenceType } from '../../enums/ToiletPreferenceEnums';
import { AuthContext } from '../../utilities/context';
import { getLocalStorageValue } from '../../utilities/localStorage';
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from '../../constants';

const PreferenceIcons = ({
  toiletId,
  initPreferenceType,
  onSetPreferenceType,
}) => {
  const [preference, setPreference] = useState(initPreferenceType);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const accessToken = getLocalStorageValue(ACCESS_TOKEN_KEY);
  const userId = getLocalStorageValue(USER_ID_KEY);

  const updateToiletPreference = useCallback(
    async (type) => {
      if (type === preference) {
        await ToiletPreferenceControlller.deleteToiletPreference(
          toiletId,
          userId,
          accessToken
        )
          .then((result) => {
            if (result.data) {
              setPreference(null);
              onSetPreferenceType(null);
            }
          })
          .catch((e) => {
            setUser(false);
            navigate('/');
          });
      } else {
        await ToiletPreferenceControlller.updateToiletPreference(
          toiletId,
          type,
          userId,
          accessToken
        )
          .then((result) => {
            setPreference(result.data.type);
            onSetPreferenceType(result.data.type);
          })
          .catch((e) => {
            setUser(false);
            navigate('/');
          });
      }
    },
    [preference, toiletId, onSetPreferenceType, setUser, navigate]
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
