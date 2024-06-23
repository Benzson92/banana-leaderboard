import { call, put, delay } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';

import fetchLeaderboardData from '../apis/fetchLeaderboardData.api';

import {
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
} from '../actions/leaderboardActions';
import { FetchLeaderboardRequestAction } from '../actionTypes/leaderboardActionTypes';

import { UserDTO } from '../models/user/UserDTO';

import {
  sortByBananaDescending,
  sortByName,
  sortByLowestRank,
} from '../utils/sort.util';
import { assignRanks } from '../utils/rank.util';
import { filterByUsername } from '../utils/filter.util';

export function* fetchLeaderboardSaga(action: FetchLeaderboardRequestAction) {
  const {
    payload: { username, sortBy, orderBy = 'asc' },
  } = action;

  try {
    yield delay(1000); // Simulate network latency
    const data: Record<string, UserDTO> = yield call(fetchLeaderboardData);

    let dataArray = sortByBananaDescending(Object.values(data));
    dataArray = assignRanks(dataArray);

    switch (sortBy) {
      case 'name':
        dataArray = sortByName(dataArray, orderBy);
        break;
      case 'lowestRank':
        dataArray = sortByLowestRank(dataArray);
        break;
      default:
        dataArray = sortByBananaDescending(dataArray);
    }

    let filteredUsers = [...dataArray];
    const searchedUser = filteredUsers.find(
      (user) => user.name.toLowerCase() === username?.toLowerCase()
    );

    if (username && isEmpty(searchedUser)) {
      filteredUsers = filterByUsername(dataArray, username);
    }

    if (username && isEmpty(filteredUsers)) {
      yield put(
        fetchLeaderboardFailure(
          'This user name does not exist! Please specify an existing user name!'
        )
      );

      return;
    }

    const top10 = filteredUsers.slice(0, 10);

    if (searchedUser?.rank >= 10) {
      top10[top10.length - 1] = searchedUser;
    }

    yield put(fetchLeaderboardSuccess(top10));
  } catch (error) {
    yield put(fetchLeaderboardFailure(error.message));
  }
}
