import { takeLatest } from 'redux-saga/effects';
import { FETCH_LEADERBOARD_REQUEST } from '../actionTypes/leaderboardActionTypes';
import { fetchLeaderboardSaga } from '../sagas/leaderboardSagas';

export function* watchFetchLeaderboard() {
  yield takeLatest(FETCH_LEADERBOARD_REQUEST, fetchLeaderboardSaga);
}
