import { NextFunction, Request, Response } from 'express';
import JwtUtils from '../util/JwtUtils';

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { access_token } = request.cookies;
    JwtUtils.verifyAccessToken(access_token);
    next();
  } catch (e: any) {
    response.status(401).send('Invalid JWT');
  }
}

export default authMiddleware;
