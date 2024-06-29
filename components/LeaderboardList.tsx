import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';

import { UserDTO } from '../models/user/UserDTO';
import Colors from '../theme/colors';

import LeaderboardItem from './LeaderboardItem';

interface LeaderboardListProps {
  leaderboard: UserDTO[];
  searchedUserName: string;
  isLoading: boolean;
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({
  leaderboard,
  searchedUserName,
  isLoading,
}) => {
  const renderItem = ({ item }: { item: UserDTO }) => (
    <LeaderboardItem item={item} searchedUserName={searchedUserName} />
  );

  if (isLoading) {
    return;
    <ActivityIndicator className="mt-14" color={Colors.primary} />;
  }

  return (
    <FlatList
      className="mt-2"
      data={leaderboard}
      renderItem={renderItem}
      keyExtractor={(item) => item.uid}
    />
  );
};

export default LeaderboardList;
