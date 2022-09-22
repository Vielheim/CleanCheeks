import Api from './api';

const TOILET_RATINGS_URL = '/toilet_ratings';

export default class ToiletRatingController {
  static async getUserLastRatedInfo(toilet_id, user_id, accessToken) {
    return await Api.makeApiRequest({
      method: 'GET',
      url: `${TOILET_RATINGS_URL}/last-rated`,
      params: {
        toilet_id: toilet_id,
        user_id: user_id,
      },
      headers: { 'x-auth-token': accessToken },
    });
  }

  static async addUserRating(data, accessToken) {
    return await Api.makeApiRequest({
      method: 'POST',
      url: TOILET_RATINGS_URL,
      data: data,
      headers: { 'x-auth-token': accessToken },
    });
  }
}
