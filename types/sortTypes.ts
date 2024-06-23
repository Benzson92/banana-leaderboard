export type SortBy = 'name' | 'lowestRank' | 'highestRank';
export type OrderBy = 'asc' | 'desc';

export interface SortOption {
  sortBy: SortBy;
  orderBy: OrderBy;
  text: string;
}
