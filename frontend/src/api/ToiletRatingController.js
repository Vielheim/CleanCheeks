import Api from './api';

const TOILET_RATINGS_URL = '/toilet_ratings';

export default class ToiletRatingController {
  static async getUserLastRatedInfo(toilet_id) {
    return await Api.makeApiRequest({
      method: 'GET',
      url: `${TOILET_RATINGS_URL}/last-rated`,
      params: {
        toilet_id: toilet_id,
      },
    });
  }

  static async addUserRating(data) {
    return await Api.makeApiRequest({
      method: 'POST',
      url: TOILET_RATINGS_URL,
      data: data,
    });
  }
}
