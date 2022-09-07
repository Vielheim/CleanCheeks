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

  static sendFailure(res: Response, statusCode: number, error: unknown) {
    let message;
    if (typeof error === 'string') {
      message = error;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return res.status(statusCode).json({
      status: 'failure',
      message: message,
    });
  }
}
