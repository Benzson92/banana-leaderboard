import { createSelector } from 'reselect';
import { RootState } from '../reducers/rootReducer';

const getLeaderboardState = (state: RootState) => state.leaderboard;

export const getLeaderboardSelector = createSelector(
  [getLeaderboardState],
  (leaderboardState) => ({
    leaderboard: leaderboardState.leaderboard,
    status: leaderboardState.status,
    sortBy: leaderboardState.sortBy,
    orderBy: leaderboardState.orderBy,
    error: leaderboardState.error,
  })
);
