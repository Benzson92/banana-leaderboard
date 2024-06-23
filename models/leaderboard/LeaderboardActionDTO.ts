import { SortBy, OrderBy } from '@/types/sortTypes';

export interface LeaderboardRequestPayloadDTO {
  username?: string;
  sortBy?: SortBy;
  orderBy?: OrderBy;
}
