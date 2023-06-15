/* eslint-disable no-console */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IgenericErrorMessages } from '../../interfaces/error'
import handlevalidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { errorlogger } from '../../shared/logger'

const globalErrorhandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log('globalErrorHandler ~', err)
    : errorlogger.error('globalErrorHandler ~', err)

  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IgenericErrorMessages[] = []

  if (err?.name === 'validationError') {
    const simplifiedError = handlevalidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    statck: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorhandler
