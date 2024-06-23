import { all } from 'redux-saga/effects';

import { watchFetchLeaderboard } from '../watchers/leaderboardWatcher';

export default function* rootSaga() {
  yield all([watchFetchLeaderboard()]);
}
