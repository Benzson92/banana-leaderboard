import { UserDTO } from '../models/user/UserDTO';

export const assignRanks = (data: UserDTO[]): UserDTO[] => {
  return data.map((item, index) => ({ ...item, rank: index + 1 }));
};
