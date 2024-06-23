import { createSelector } from 'reselect';
import { RootState } from '../reducers/rootReducer';

const getLeaderboardState = (state: RootState) => state.leaderboard;

// export const getLeaderboard = createSelector(
//   [getLeaderboardState],
//   (leaderboardState) => leaderboardState.leaderboard
// );

export const getLeaderboardSelector = createSelector(
  [getLeaderboardState],
  (leaderboardState) => {
    console.log('leaderboardState', leaderboardState);

    return {
      leaderboard: leaderboardState.leaderboard,
      status: leaderboardState.status,
      sortBy: leaderboardState.sortBy,
      orderBy: leaderboardState.orderBy,
      error: leaderboardState.error,
    };
  }
);
