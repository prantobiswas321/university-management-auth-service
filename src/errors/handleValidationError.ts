import mongoose from 'mongoose'
import { IgenericErrorMessages } from '../interfaces/error'
import { IGenericErrorResponse } from '../interfaces/common'

const handlevalidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IgenericErrorMessages[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handlevalidationError
