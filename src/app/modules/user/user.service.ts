import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generatedId();

  user.id = id;

  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
