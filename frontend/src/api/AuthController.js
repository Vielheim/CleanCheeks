import Api from './api';

const AUTH_URL = '/auth';

export default class AuthController {
  static async googleLogin(payload) {
    return Api.makeApiRequest({
      method: 'POST',
      url: `${AUTH_URL}/google`,
      data: {
        response: payload,
      },
    });
  }

  static async checkLogin(accessToken) {
    return Api.makeApiRequest({
      method: 'POST',
      url: `${AUTH_URL}/check-login`,
      headers: {
        'x-auth-token': accessToken,
      },
    });
  }
}
