import { call, put, delay } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';

import fetchLeaderboardData from '../apis/fetchLeaderboardData.api';

import {
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
} from '../actions/leaderboardActions';
import { FetchLeaderboardRequestAction } from '../actionTypes/leaderboardActionTypes';

import { UserDTO } from '../models/user/UserDTO';

// import { customSortByName } from '../utils/customSortByName.util';
import {
  sortByBananaDescending,
  sortByName,
  sortByLowestRank,
} from '../utils/sort.util';
import { assignRanks } from '../utils/rank.util';
import { filterByUsername } from '../utils/filter.util';

// import { getSearchedUser } from '../selectors/userSelectors';

export function* fetchLeaderboardSaga(action: FetchLeaderboardRequestAction) {
  const {
    payload: { username, sortBy, orderBy = 'asc' },
  } = action;

  // const searchedUser = yield select(getSearchedUser);

  // console.log('fetchLeaderboardSaga searchedUser:', searchedUser);

  try {
    yield delay(1000); // Simulate network latency
    const data: Record<string, UserDTO> = yield call(fetchLeaderboardData);

    // console.log('fetchLeaderboardSaga data:', data);

    // const response: Response = yield call(
    //   fetch,
    //   '/assets/data/leaderboard.json'
    // );
    // const data: UserDTO[] = yield response.json();

    // const data: Record<string, UserDTO> = leaderboardData;

    // let dataArray = Object.values(data)
    //   .sort((a, b) => b.bananas - a.bananas || customSortByName(a, b))
    //   .map((item, index) => ({ ...item, rank: index + 1 }));

    // console.log('fetchLeaderboardSaga dataArray:', dataArray);

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
      // filteredUsers = dataArray.filter((user) =>
      //   user.name.toLowerCase().includes(username.toLowerCase())
      // );

      filteredUsers = filterByUsername(dataArray, username);
    }

    // const top10 = filteredUsers.slice(0, 10);

    // console.log('fetchLeaderboardSaga top10 1:', top10);

    // const searchedUser = dataArray.find((user) => user.name === username);
    // const searchedUserIndex = dataArray.findIndex(
    //   (user) => user.name === username
    // );

    if (username && isEmpty(filteredUsers)) {
      console.log('fetchLeaderboardFailure filteredUsers 1:', filteredUsers);
      console.log('fetchLeaderboardFailure username 1:', username);

      // If the searched user does not exist, show an alert
      yield put(
        fetchLeaderboardFailure(
          'This user name does not exist! Please specify an existing user name!'
        )
      );

      return; // Exit the saga early
    }

    const top10 = filteredUsers.slice(0, 10);
    // const searchedUser = filteredUsers.find(
    //   (user) => user.name === username?.trim()
    // );
    // const searchedUserIndex = filteredUsers.findIndex(
    //   (user) => user.name === username
    // );

    console.log('fetchLeaderboardSaga searchedUser 1:', searchedUser);

    if (searchedUser?.rank >= 10) {
      console.log('fetchLeaderboardSaga searchedUser 2:', searchedUser);

      top10[top10.length - 1] = searchedUser;
    }

    console.log('fetchLeaderboardSaga top10 2:', top10);

    yield put(fetchLeaderboardSuccess(top10));
  } catch (error) {
    console.error('fetchLeaderboardSaga error:', error);
    yield put(fetchLeaderboardFailure(error.message));
  }
}
