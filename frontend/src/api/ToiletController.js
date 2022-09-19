import Api from './api';

export default class ToiletControlller {
  static async fetchCloseToilets(coordinates, radius, userId = 'testuser') {
    return Api.makeApiRequest({
      method: 'GET',
      url: `/toilets/neighbours?latitude=${coordinates[0]}&longitude=${coordinates[1]}&radius=${radius}&userId=${userId}`,
    });
  }
}