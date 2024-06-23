import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  TextInput,
  Pressable,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import { StyledComponent } from 'nativewind';

// import { RootState } from '../reducers/rootReducer';

import { getUserStateSelector } from '../selectors/userSelectors';
import { getLeaderboardSelector } from '../selectors/leaderboardSelectors';

import { fetchLeaderboard } from '../actions/leaderboardActions';
import { searchUserRequestAction } from '../actions/userActions';

import { UserDTO } from '../models/user/UserDTO';
import { DataStatus } from '../enums/DataStatusEnum';
import { SortBy, OrderBy, SortOption } from '../types/sortTypes';

import SortButton from '../components/SortButton';
import SearchIcon from '../components/icons/SearchIcon';

import Colors from '../theme/colors';
import getDataStatus from '../utils/getDataStatus.util';

const sortOptions: SortOption[] = [
  { sortBy: 'name', orderBy: 'asc', text: 'Sort by Name: A - Z' },
  { sortBy: 'name', orderBy: 'desc', text: 'Sort by Name: Z - A' },
  { sortBy: 'lowestRank', orderBy: 'asc', text: 'Show Lowest Ranked' },
];

// const StyledFlatList = styled(FlatList, {
//   classProps: ['contentContainerStyle'],
// });

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

  // const searchedUser = useSelector(
  //   (state: RootState) => state.user.searchedUser
  // );
  // const error = useSelector((state: RootState) => state.user.error);

  // const [searchTerm, setSearchTerm] = useState('');

  console.log('Leaderboard error', error);
  console.log('Leaderboard leaderboard', leaderboard);
  console.log('Leaderboard status', status);
  console.log('Leaderboard dataStatusFlags LOADING', dataStatusFlags.LOADING);

  // useEffect(() => {
  //   console.log('searchedUserName', searchedUserName);

  //   dispatch(
  //     fetchLeaderboard({ username: searchedUserName, sortBy: undefined })
  //   );
  // }, [dispatch, searchedUserName]);

  useEffect(() => {
    dispatch(fetchLeaderboard({}));
  }, [dispatch]);

  useEffect(() => {
    console.log('useEffect error', error);

    if (dataStatusFlags.FAILED && error) {
      Alert.alert('Error', error);
    }
  }, [error, dataStatusFlags.FAILED]);

  const handleChangeText = (text: string) => {
    dispatch(searchUserRequestAction(text));
  };

  const handleSearch = () => {
    console.log('searchedUserName', searchedUserName);

    dispatch(
      fetchLeaderboard({ username: searchedUserName, sortBy: undefined })
    );
  };

  const handleSort = (sortByValue: SortBy, orderByValue: OrderBy) => {
    dispatch(fetchLeaderboard({ sortBy: sortByValue, orderBy: orderByValue }));
  };

  // const handleSortByName = (orderBy: OrderBy) => {
  //   dispatch(fetchLeaderboard({ sortBy: 'name', orderBy }));
  // };

  // const handleSortByLowestRank = () => {
  //   dispatch(fetchLeaderboard({ sortBy: 'lowestRank' }));
  // };

  const renderSortButtonItem: ListRenderItem<SortOption> = ({ item }) => (
    <SortButton
      sortBy={item.sortBy}
      orderBy={item.orderBy}
      text={item.text}
      currentSortBy={sortBy}
      currentOrderBy={orderBy}
      handleSort={handleSort}
      style="mx-2"
    />
  );

  const renderItem = ({ item }: { item: UserDTO }) => {
    const isHighlighted =
      searchedUserName?.toLowerCase() === item.name.toLowerCase();
    const highlightedText = isHighlighted ? 'text-white font-bold' : '';

    return (
      <View
        className={`p-2 rounded-md flex-row ${
          isHighlighted ? 'bg-primary' : 'bg-white'
        }`}
      >
        <Text className={`flex-[2] ${highlightedText}`}>{item.name}</Text>
        <Text className={`flex-1 ${highlightedText}`}>{item.rank}</Text>
        <Text className={`flex-1 ${highlightedText}`}>{item.bananas}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white py-6">
      <View className="flex-row justify-between px-4 mb-6">
        {/* <TextInput
          className="border border-gray-300 p-2 rounded-md flex-[2] mr-2"
          value={searchedUserName}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSearch}
          placeholder="Search user"
          returnKeyType="search"
        /> */}
        <View className="flex-row items-center border border-gray-300 p-2 rounded-md flex-[2] mr-2">
          <SearchIcon className="mr-2" />
          <TextInput
            className="flex-1"
            value={searchedUserName}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSearch}
            placeholder="Search user"
            returnKeyType="search"
          />
        </View>
        <Pressable
          disabled={dataStatusFlags.LOADING}
          onPress={handleSearch}
          className={`justify-center p-2 rounded-md flex-1 ml-2 bg-primary ${dataStatusFlags.LOADING ? 'bg-gray-300' : ''}`}
        >
          <Text className="text-white text-center font-bold">Search</Text>
        </Pressable>
      </View>
      <StyledComponent
        component={FlatList}
        horizontal
        data={sortOptions}
        renderItem={renderSortButtonItem}
        keyExtractor={(item: SortOption) => `${item.sortBy}-${item.orderBy}`}
        showsHorizontalScrollIndicator={false}
        className="flex-grow-0 mb-6"
        contentContainerStyle={styles.contentContainer}
        // contentContainerStyle="pl-4"
      />
      {/* <StyledScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-grow-0 mb-6"
      >
        <Pressable
          onPress={() => handleSortByName('asc')}
          className="border border-primary p-2 rounded-md h-9 justify-center  mr-4"
        >
          <Text className="text-primary text-center">Sort by Name: A - Z</Text>
        </Pressable>
        <Pressable
          onPress={() => handleSortByName('desc')}
          className=" text-primary border-primary p-2 rounded-md h-9 justify-center  mr-4"
        >
          <Text className="text-primary">Sort by Name: Z - A</Text>
        </Pressable>
        <Pressable
          onPress={handleSortByLowestRank}
          className=" text-primary border-primary p-2 rounded-md h-9 justify-center  mr-4"
        >
          <Text className="text-primary">Show Lowest Ranked</Text>
        </Pressable>
      </StyledScrollView> */}
      {/* {error && <Text className="text-red-500 mt-2">{error}</Text>} */}
      <View className="w-full px-4">
        <View className="flex-row justify-between items-center bg-gray-200 p-2 rounded-md">
          <Text className="flex-[2] font-bold">Name</Text>
          <Text className="flex-1 font-bold ">Rank</Text>
          <Text className="flex-1 font-bold ">Number of bananas</Text>
        </View>
        {dataStatusFlags.LOADING ? (
          <ActivityIndicator className="mt-14" color={Colors.primary} />
        ) : (
          <FlatList
            className="mt-2"
            data={leaderboard}
            renderItem={renderItem}
            keyExtractor={(item) => item.uid}
          />
        )}
      </View>
    </View>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 8,
  },
});
