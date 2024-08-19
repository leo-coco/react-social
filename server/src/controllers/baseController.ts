import type { Response } from 'express';
import type { PrismaFormattedError } from '../../types/prismaError';

export class BaseController {

  protected returnPrismaError(res: Response, e: unknown, message: string) {
    const error = e as PrismaFormattedError;
    return this.returnError(res, {
      httpStatus: error.httpStatus,
      message, 
      error: error.errorMessage
    })
  }

  protected returnError(res: Response, {httpStatus, message, error = ""}: {httpStatus: number, message: string; error?: string}) {
    return res.status(httpStatus).json({ message, error: error })
  }
}