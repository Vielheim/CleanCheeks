import jwt from 'jsonwebtoken';

interface Payload {
  userId: string;
}

export default class JwtUtils {
  static generateAccessToken(payload: Object, options = {}) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, options);
  }

  static verifyAccessToken(accessToken: string) {
    return jwt.verify(accessToken, process.env.JWT_SECRET as string);
  }

  static decodeAccessToken(accessToken: string) {
    return jwt.decode(accessToken) as Payload;
  }
}
