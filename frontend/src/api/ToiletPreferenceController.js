import Api from './api';

export default class ToiletPreferenceControlller {
  static async updateToiletPreference(toiletId, type) {
    return Api.makeApiRequest({
      method: 'PUT',
      url: '/toilet_preferences',
      data: {
        toilet_id: toiletId,
        type,
      },
    });
  }
}
