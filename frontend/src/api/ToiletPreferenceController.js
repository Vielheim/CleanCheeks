import Api from './api';

const TOILET_PREFERENCE_URL = '/toilet_preferences';

export default class ToiletPreferenceControlller {
  static async updateToiletPreference(toiletId, type) {
    return Api.makeApiRequest({
      method: 'PUT',
      url: TOILET_PREFERENCE_URL,
      data: {
        toilet_id: toiletId,
        type,
      },
    });
  }

  static async deleteToiletPreference(toiletId) {
    return Api.makeApiRequest({
      method: 'DELETE',
      url: `${TOILET_PREFERENCE_URL}?toiletId=${toiletId}`,
    });
  }
}
