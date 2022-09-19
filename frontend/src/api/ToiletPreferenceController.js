import Api from './api';

export default class ToiletPreferenceControlller {
  static async updateToiletPreference(toiletId, type, userId = 'testuser') {
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
