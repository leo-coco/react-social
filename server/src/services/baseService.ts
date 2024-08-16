import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export class BaseService {
  protected handlePrismaError (exception: unknown) {
    let errorMessage: unknown;
    let httpStatus: number;
    if (exception instanceof PrismaClientRustPanicError) {
      httpStatus = 400;
      errorMessage = exception.message;
    } else if (exception instanceof PrismaClientValidationError) {
      httpStatus = 422;
      errorMessage = exception.message;
    } else if (exception instanceof PrismaClientKnownRequestError) {
      httpStatus = 400;
      errorMessage = exception.message;
    } else if (exception instanceof PrismaClientUnknownRequestError) {
      httpStatus = 400;
      errorMessage = exception.message;
    } else if (exception instanceof PrismaClientInitializationError) {
      httpStatus = 400;
      errorMessage = exception.message;
    } else if (
      exception.statusCode &&
      exception.statusCode >= 400 &&
      exception.statusCode <= 499
    ) {
      httpStatus = exception.statusCode;
      errorMessage = exception.message;
    } else {
      httpStatus = 500;
      errorMessage = [
        'Sorry! something went to wrong on our end, Please try again later',
      ];
  }
  return {httpStatus, errorMessage}
}
}