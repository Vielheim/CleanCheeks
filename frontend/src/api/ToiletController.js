import Api from './api';

const TOILETS_URL = '/toilets';

export default class ToiletControlller {
  static async fetchCloseToilets(coordinates, radius, userId) {
    return Api.makeApiRequest({
      method: 'GET',
      url: `${TOILETS_URL}/neighbours?latitude=${coordinates[0]}&longitude=${coordinates[1]}&radius=${radius}&userId=${userId}`,
    });
  }

  static async getToiletRank(id) {
    return Api.makeApiRequest({
      method: 'GET',
      url: `${TOILETS_URL}/ranking?id=${id}`,
    });
  }

  static async fetchToiletWithUserPreferences(userId) {
    return Api.makeApiRequest({
      method: 'GET',
      url: `${TOILETS_URL}/with_user_preferences?userId=${userId}`,
    });
  }
}
