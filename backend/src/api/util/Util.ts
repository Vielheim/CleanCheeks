import { Response } from 'express';

export default class Util {
  static sendSuccess(
    res: Response,
    statusCode: number,
    message: string,
    data: any
  ) {
    return res.status(statusCode).json({
      status: 'success',
      message: message,
      data: data,
    });
  }

  static sendFailure(res: Response, statusCode: number, message: any) {
    return res.status(statusCode).json({
      status: 'failure',
      message: message,
    });
  }
}
