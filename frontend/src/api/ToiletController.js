import Api from './api';

export default class ToiletControlller {
  static async fetchCloseToilets(coordinates, radius) {
    return Api.makeApiRequest({
      method: 'GET',
      url: `/toilets/neighbours?latitude=${coordinates[0]}&longitude=${coordinates[1]}&radius=${radius}`,
    });
  }

  static async getToiletRank(id) {
    return Api.makeApiRequest({
      method: 'GET',
      url: `/toilets/ranking?id=${id}`,
    });
  }
}
