import { all } from 'redux-saga/effects';

import { watchFetchLeaderboard } from '../watchers/leaderboardWatcher';
// import { watchSearchUser } from '../watchers/userWatcher';

export default function* rootSaga() {
  yield all([
    watchFetchLeaderboard(),
    // watchSearchUser(),
  ]);
}
