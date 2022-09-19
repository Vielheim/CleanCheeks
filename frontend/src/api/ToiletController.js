import Api from './api';
import { getLocalStorageValue } from '../utilities/localStorage';
import { USER_ID_KEY } from '../constants';

export default class ToiletControlller {
  static async fetchCloseToilets(
    coordinates,
    radius,
    userId = getLocalStorageValue(USER_ID_KEY) ?? 'testuser'
  ) {
    return await Api.makeApiRequest({
      method: 'GET',
      url: `/toilets/neighbours?latitude=${coordinates[0]}&longitude=${coordinates[1]}&radius=${radius}&userId=${userId}`,
    });
  }
}
