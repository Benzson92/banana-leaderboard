import { combineReducers } from 'redux';

import leaderboardReducer from './leaderboardReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
  leaderboard: leaderboardReducer,
  user: userReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
