import isEmpty from 'lodash/isEmpty';
import { UserDTO } from '../models/user/UserDTO';

export const filterByUsername = (
  data: UserDTO[],
  username: string
): UserDTO[] => {
  if (!username) return data;

  const filteredUsers = data.filter((user) =>
    user.name.toLowerCase().includes(username.toLowerCase())
  );

  return isEmpty(filteredUsers) ? [] : filteredUsers;
};
