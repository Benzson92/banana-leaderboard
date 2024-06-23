import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import isEmpty from 'lodash/isEmpty';

import { fetchLeaderboardSaga } from '../sagas/leaderboardSagas';
import fetchLeaderboardData from '../apis/fetchLeaderboardData.api';

import {
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
} from '../actions/leaderboardActions';
import {
  FetchLeaderboardRequestAction,
  FETCH_LEADERBOARD_REQUEST,
} from '../actionTypes/leaderboardActionTypes';

import leaderboardData from '../assets/data/leaderboard.json';

import { customSortByName } from '../utils/customSortByName.util';
import { SortBy, OrderBy } from '../types/sortTypes';

const testTimeout = 5000;

jest.setTimeout(10000);

describe('fetchLeaderboardSaga', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('Scenario: Successful data fetch and sorting by highest rank', () => {
    it(`
    Given the data fetch is successful
    When the data is sorted by the highest rank
    Then the data should be correctly sorted by the highest rank
  `, () => {
      const action: FetchLeaderboardRequestAction = {
        type: FETCH_LEADERBOARD_REQUEST,
        payload: {},
      };

      const sortedData = Object.values(leaderboardData)
        .sort((a, b) => b.bananas - a.bananas || customSortByName(a, b))
        .map((item, index) => ({ ...item, rank: index + 1 }))
        .slice(0, 10);

      return expectSaga(fetchLeaderboardSaga, action)
        .provide([[call(fetchLeaderboardData), leaderboardData]])
        .put(fetchLeaderboardSuccess(sortedData))
        .run({ timeout: testTimeout });
    });
  });

  describe('Scenario: Successful data fetch and sorting by name in ascending order', () => {
    it(`
    Given the data fetch is successful
    When the data is sorted by name in ascending order
    Then the data should be correctly sorted by name in ascending order
  `, () => {
      const action: FetchLeaderboardRequestAction = {
        type: FETCH_LEADERBOARD_REQUEST,
        payload: {
          username: undefined,
          sortBy: 'name' as SortBy,
          orderBy: 'asc' as OrderBy,
        },
      };

      let sortedData = Object.values(leaderboardData)
        .sort((a, b) => b.bananas - a.bananas || customSortByName(a, b))
        .map((item, index) => ({ ...item, rank: index + 1 }));

      sortedData = sortedData.sort((a, b) => customSortByName(a, b, 'asc'));

      const top10Test = sortedData.slice(0, 10);

      return expectSaga(fetchLeaderboardSaga, action)
        .provide([[call(fetchLeaderboardData), leaderboardData]])
        .put(fetchLeaderboardSuccess(top10Test))
        .run({ timeout: testTimeout });
    });
  });

  describe('Scenario: Successful data fetch and sorting by name in descending order', () => {
    it(`
    Given the data fetch is successful
    When the data is sorted by name in descending order
    Then the data should be correctly sorted by name in descending order
  `, () => {
      const action: FetchLeaderboardRequestAction = {
        type: FETCH_LEADERBOARD_REQUEST,
        payload: {
          username: undefined,
          sortBy: 'name' as SortBy,
          orderBy: 'desc' as OrderBy,
        },
      };

      let sortedData = Object.values(leaderboardData)
        .sort((a, b) => b.bananas - a.bananas || customSortByName(a, b))
        .map((item, index) => ({ ...item, rank: index + 1 }));

      sortedData = sortedData.sort((a, b) => customSortByName(a, b, 'desc'));

      const top10Test = sortedData.slice(0, 10);

      return expectSaga(fetchLeaderboardSaga, action)
        .provide([[call(fetchLeaderboardData), leaderboardData]])
        .put(fetchLeaderboardSuccess(top10Test))
        .run({ timeout: testTimeout });
    });
  });

  describe('Scenario: Successful data fetch and sorting by lowest rank', () => {
    it(`
    Given the data fetch is successful
    When the data is sorted by the lowest rank
    Then the data should be correctly sorted by the lowest rank
  `, () => {
      const action: FetchLeaderboardRequestAction = {
        type: FETCH_LEADERBOARD_REQUEST,
        payload: {
          username: undefined,
          sortBy: 'lowestRank' as SortBy,
          orderBy: 'asc' as OrderBy,
        },
      };

      let sortedData = Object.values(leaderboardData)
        .sort((a, b) => b.bananas - a.bananas || customSortByName(a, b))
        .map((item, index) => ({ ...item, rank: index + 1 }));

      sortedData = sortedData.sort(
        (a, b) => a.bananas - b.bananas || customSortByName(a, b)
      );

      const top10Test = sortedData.slice(0, 10);

      return expectSaga(fetchLeaderboardSaga, action)
        .provide([[call(fetchLeaderboardData), leaderboardData]])
        .put(fetchLeaderboardSuccess(top10Test))
        .run({ timeout: testTimeout });
    });
  });

  describe('Scenario: Allow user to search by partial name', () => {
    it(`
    Given the data fetch is successful
    When the user searches by a partial name
    Then only usernames matching the criteria should be shown and sorted by highest rank
  `, () => {
      const username = 'Al';
      const action: FetchLeaderboardRequestAction = {
        type: FETCH_LEADERBOARD_REQUEST,
        payload: { username },
      };

      let dataArray = Object.values(leaderboardData)
        .sort((a, b) => b.bananas - a.bananas || customSortByName(a, b))
        .map((item, index) => ({ ...item, rank: index + 1 }));

      const searchedUser = dataArray.find(
        (user) => user.name.toLowerCase() === username?.toLowerCase()
      );

      if (username && isEmpty(searchedUser)) {
        dataArray = dataArray.filter((user) =>
          user.name.toLowerCase().includes(username.toLowerCase())
        );
      }

      const top10 = dataArray.slice(0, 10);

      return expectSaga(fetchLeaderboardSaga, action)
        .provide([[call(fetchLeaderboardData), leaderboardData]])
        .put(fetchLeaderboardSuccess(top10))
        .run({ timeout: testTimeout });
    });
  });

  describe('Scenario: User search that exists and has enough bananas to appear in the top 10', () => {
    it(`
    Given a user search is performed
    When the user exists and has enough bananas to appear in the top 10
    Then the user should be included in the top 10 list
  `, () => {
      const username = 'Chris Buckley';
      const action: FetchLeaderboardRequestAction = {
        type: FETCH_LEADERBOARD_REQUEST,
        payload: {
          username,
          sortBy: 'highestRank' as SortBy,
          orderBy: 'asc' as OrderBy,
        },
      };

      const dataArray = Object.values(leaderboardData)
        .sort((a, b) => b.bananas - a.bananas || customSortByName(a, b))
        .map((item, index) => ({ ...item, rank: index + 1 }));

      const top10 = dataArray.slice(0, 10);

      return expectSaga(fetchLeaderboardSaga, action)
        .provide([[call(fetchLeaderboardData), leaderboardData]])
        .put(fetchLeaderboardSuccess(top10))
        .run({ timeout: testTimeout });
    });
  });

  describe('Scenario: User search that exists but does not have enough bananas to appear in the top 10', () => {
    it(`
    Given a user search is performed
    When the user exists but doesn’t have enough bananas to appear in the top 10
    Then the user should replace the last rank in the top 10 list
  `, () => {
      const username = 'Jessica Langford';
      const action: FetchLeaderboardRequestAction = {
        type: FETCH_LEADERBOARD_REQUEST,
        payload: {
          username,
          sortBy: 'highestRank' as SortBy,
          orderBy: 'asc' as OrderBy,
        },
      };

      const dataArray = Object.values(leaderboardData)
        .sort((a, b) => b.bananas - a.bananas || customSortByName(a, b))
        .map((item, index) => ({ ...item, rank: index + 1 }));

      const searchedUser = dataArray.find(
        (user) => user.name.toLowerCase() === username.toLowerCase()
      );
      const top10 = dataArray.slice(0, 10);

      if (searchedUser.rank >= 10) {
        top10[top10.length - 1] = searchedUser;
      }

      return expectSaga(fetchLeaderboardSaga, action)
        .provide([[call(fetchLeaderboardData), leaderboardData]])
        .put(fetchLeaderboardSuccess(top10))
        .run({ timeout: testTimeout });
    });
  });

  describe('Scenario: User search that does not exist', () => {
    it(`
    Given a user search is performed
    When the user does not exist
    Then an appropriate message should be returned
  `, () => {
      const username = 'non_existent_user';
      const action: FetchLeaderboardRequestAction = {
        type: FETCH_LEADERBOARD_REQUEST,
        payload: {
          username,
          sortBy: 'highestRank' as SortBy,
          orderBy: 'asc' as OrderBy,
        },
      };

      const errorMessage =
        'This user name does not exist! Please specify an existing user name!';

      return expectSaga(fetchLeaderboardSaga, action)
        .provide([[call(fetchLeaderboardData), leaderboardData]])
        .put(fetchLeaderboardFailure(errorMessage))
        .run({ timeout: testTimeout });
    });
  });

  describe('Scenario: Failure due to an error during data fetch', () => {
    it(`
    Given the data fetch fails
    When the failure is handled
    Then an error message should be displayed
  `, () => {
      const action: FetchLeaderboardRequestAction = {
        type: FETCH_LEADERBOARD_REQUEST,
        payload: {
          username: '',
          sortBy: 'highestRank' as SortBy,
          orderBy: 'asc' as OrderBy,
        },
      };

      const error = new Error('Something went wrong');

      return expectSaga(fetchLeaderboardSaga, action)
        .provide([[call(fetchLeaderboardData), throwError(error)]])
        .put(fetchLeaderboardFailure(error.message))
        .run({ timeout: testTimeout });
    });
  });
});
