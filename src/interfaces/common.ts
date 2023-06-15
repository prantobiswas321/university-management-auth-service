import { Model } from 'mongoose'
import { IgenericErrorMessages } from './error'
import { IUser } from '../app/modules/users/user.interface'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IgenericErrorMessages[]
}

export type UserModel = Model<IUser, Record<string, unknown>>
