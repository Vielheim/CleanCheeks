import Api from './api';

const TOILET_PREFERENCE_URL = '/toilet_preferences';

export default class ToiletPreferenceControlller {
  static async updateToiletPreference(toiletId, type, userId, accessToken) {
    return Api.makeApiRequest({
      method: 'PUT',
      url: TOILET_PREFERENCE_URL,
      data: {
        toilet_id: toiletId,
        user_id: userId,
        type,
      },
      headers: { 'x-auth-token': accessToken },
    });
  }

  static async deleteToiletPreference(toiletId, userId, accessToken) {
    return Api.makeApiRequest({
      method: 'DELETE',
      url: `${TOILET_PREFERENCE_URL}?toiletId=${toiletId}&userId=${userId}`,
      headers: { 'x-auth-token': accessToken },
    });
  }
}
