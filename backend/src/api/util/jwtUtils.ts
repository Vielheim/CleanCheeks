import jwt from 'jsonwebtoken';

export default class JwtUtils {
  static accessTokenGenerator(payload: Object, options = {}) {
    return jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
      options
    );
  }
}
