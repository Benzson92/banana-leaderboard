import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Alert } from 'react-native';

import { getUserStateSelector } from '../selectors/userSelectors';
import { getLeaderboardSelector } from '../selectors/leaderboardSelectors';

import { fetchLeaderboard } from '../actions/leaderboardActions';
import { searchUserRequestAction } from '../actions/userActions';

import { DataStatus } from '../enums/DataStatusEnum';
import { SortBy, OrderBy, SortOption } from '../types/sortTypes';

import SearchBar from '../components/SearchBar';
import SortOptions from '../components/SortOptions';

import LeaderboardHeader from '../components/LeaderboardHeader';
import LeaderboardList from '../components/LeaderboardList';

import getDataStatus from '../utils/getDataStatus.util';

const sortOptions: SortOption[] = [
  { sortBy: 'name', orderBy: 'asc', text: 'Sort by Name: A - Z' },
  { sortBy: 'name', orderBy: 'desc', text: 'Sort by Name: Z - A' },
  { sortBy: 'lowestRank', orderBy: 'asc', text: 'Show Lowest Ranked' },
];

const Leaderboard: React.FC = () => {
  const dispatch = useDispatch();

  const { searchedUserName } = useSelector(getUserStateSelector);
  const { leaderboard, status, sortBy, orderBy, error } = useSelector(
    getLeaderboardSelector
  );

  const dataStatusFlags: Record<keyof typeof DataStatus, boolean> = useMemo(
    () => getDataStatus(status),
    [status]
  );

  useEffect(() => {
    dispatch(fetchLeaderboard({}));
  }, [dispatch]);

  useEffect(() => {
    if (dataStatusFlags.FAILED && error) {
      Alert.alert('Error', error);
    }
  }, [error, dataStatusFlags.FAILED]);

  const handleChangeText = (text: string) => {
    dispatch(searchUserRequestAction(text));
  };

  const handleSearch = () => {
    dispatch(
      fetchLeaderboard({ username: searchedUserName, sortBy: undefined })
    );
  };

  const handleSort = (sortByValue: SortBy, orderByValue: OrderBy) => {
    dispatch(fetchLeaderboard({ sortBy: sortByValue, orderBy: orderByValue }));
  };

  return (
    <View className="flex-1 bg-white py-6">
      <SearchBar
        searchedUserName={searchedUserName}
        handleChangeText={handleChangeText}
        handleSearch={handleSearch}
        isLoading={dataStatusFlags.LOADING}
      />
      <SortOptions
        sortOptions={sortOptions}
        currentSortBy={sortBy}
        currentOrderBy={orderBy}
        handleSort={handleSort}
      />
      <View className="w-full px-4">
        <LeaderboardHeader />
        <LeaderboardList
          leaderboard={leaderboard}
          searchedUserName={searchedUserName}
          isLoading={dataStatusFlags.LOADING}
        />
      </View>
    </View>
  );
};

export default Leaderboard;
