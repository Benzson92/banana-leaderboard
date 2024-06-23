import { OrderBy } from '../types/sortTypes';

export interface NamedItemDTO {
  name: string;
}

export const customSortByName = <T extends NamedItemDTO>(
  a: T,
  b: T,
  orderBy: OrderBy = 'asc'
): number => {
  if (a.name === '') return 1;
  if (b.name === '') return -1;

  const comparison = a.name.localeCompare(b.name);
  return orderBy === 'asc' ? comparison : -comparison;
};
