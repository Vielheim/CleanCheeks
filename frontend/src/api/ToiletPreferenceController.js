import Api from './api';
import { getLocalStorageValue } from '../utilities/localStorage';
import { USER_ID_KEY } from '../constants';

export default class ToiletPreferenceControlller {
  static async updateToiletPreference(
    toiletId,
    type,
    userId = getLocalStorageValue(USER_ID_KEY) ?? 'testuser'
  ) {
    return Api.makeApiRequest({
      method: 'PUT',
      url: '/toilet_preferences',
      data: {
        user_id: userId,
        toilet_id: toiletId,
        type,
      },
    });
  }
}
