import React, { useCallback, useState, useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import ToiletPreferenceControlller from '../../api/ToiletPreferenceController';
import { PreferenceType } from '../../enums/ToiletPreferenceEnums';
import { ToastContext, UserContext } from '../../utilities/context';
import { getLocalStorageValue } from '../../utilities/localStorage';
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from '../../constants';
import styles from './PreferenceIcons.module.scss';

const PreferenceIcons = ({
  toiletId,
  initPreferenceType,
  onSetPreferenceType,
}) => {
  const [preference, setPreference] = useState(initPreferenceType);
  const { setUser, fetchToiletPreferences } = useContext(UserContext);
  const setToastType = useContext(ToastContext);
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
            if (type === PreferenceType.FAVOURITE) {
              setToastType('UNFAVOURITE');
            } else {
              setToastType('UNBLACKLIST');
            }
            if (result.data) {
              setPreference(null);
              onSetPreferenceType(null);
            }
          })
          .catch((e) => {
            if (e.status == 401) {
              setToastType('LOGIN');
              setUser(false);
            } else {
              setToastType('ERROR');
            }
          });
      } else {
        await ToiletPreferenceControlller.updateToiletPreference(
          toiletId,
          type,
          userId,
          accessToken
        )
          .then((result) => {
            if (result.data.type === PreferenceType.FAVOURITE) {
              setToastType('FAVOURITE');
            } else {
              setToastType('BLACKLIST');
            }
            setPreference(result.data.type);
            onSetPreferenceType(result.data.type);
          })
          .catch((e) => {
            if (e.status == 401) {
              setToastType('LOGIN');
              setUser(false);
            } else {
              setToastType('ERROR');
            }
          });

        window.gtag('event', type, {
          event_category: 'preferences',
          event_label: type,
        });
      }
      fetchToiletPreferences();
    },
    [
      preference,
      fetchToiletPreferences,
      toiletId,
      userId,
      accessToken,
      onSetPreferenceType,
      setToastType,
      setUser,
    ]
  );

  const onClickFavourite = useCallback(() => {
    updateToiletPreference(PreferenceType.FAVOURITE);
  }, [updateToiletPreference]);

  const onClickBlacklist = useCallback(() => {
    updateToiletPreference(PreferenceType.BLACKLIST);
  }, [updateToiletPreference]);

  return (
    <div className={styles['preference-icons-container']}>
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
