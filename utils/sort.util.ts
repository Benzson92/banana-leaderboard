import { UserDTO } from '../models/user/UserDTO';
import { OrderBy } from '../types/sortTypes';

import { customSortByName } from './customSortByName.util';

export const sortByBananaDescending = (data: UserDTO[]): UserDTO[] => {
  return data.sort((a, b) => b.bananas - a.bananas || customSortByName(a, b));
};

export const sortByName = (
  data: UserDTO[],
  orderBy: OrderBy = 'asc'
): UserDTO[] => {
  return data.sort((a, b) => customSortByName(a, b, orderBy));
};

export const sortByLowestRank = (data: UserDTO[]): UserDTO[] => {
  return data.sort((a, b) => a.bananas - b.bananas || customSortByName(a, b));
};
