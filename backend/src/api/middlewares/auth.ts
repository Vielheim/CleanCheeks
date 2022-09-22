import { NextFunction, Request, Response } from 'express';
import JwtUtils from '../util/JwtUtils';

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const accessToken = (request.headers['x-auth-token'] as string) ?? '';
    JwtUtils.verifyAccessToken(accessToken);
    next();
  } catch (e: any) {
    response.status(401).send('Invalid JWT');
  }
}

export default authMiddleware;
