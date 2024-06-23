import { SortBy, OrderBy } from '../types/sortTypes';

interface GetSortButtonColorParams {
  sortBy: SortBy;
  orderBy: OrderBy;
  currentSortBy: SortBy;
  currentOrderBy: OrderBy;
}

interface SortButtonColor {
  borderColor: string;
  textColor: string;
}

export const getSortButtonColor = ({
  sortBy,
  orderBy,
  currentSortBy,
  currentOrderBy,
}: GetSortButtonColorParams): SortButtonColor => {
  if (sortBy === currentSortBy && orderBy === currentOrderBy) {
    return {
      borderColor: 'border-primary',
      textColor: 'text-primary',
    };
  }
  return {
    borderColor: 'border-gray-300',
    textColor: 'text-gray-800',
  };
};
