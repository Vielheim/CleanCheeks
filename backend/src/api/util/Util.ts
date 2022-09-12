import { Response } from 'express';
import { DataNotFoundError } from '../../errors/Errors';

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

  static sendFailure(res: Response, error: unknown) {
    let message;
    let statusCode;
    if (typeof error === 'string') {
      message = error;
    } else if (error instanceof Error) {
      message = error.message;
      console.error(error.stack);
    }

    if (error instanceof DataNotFoundError) {
      statusCode = 404;
    }

    return res.status(statusCode ?? 400).json({
      status: 'failure',
      message: message,
    });
  }
}
