import React from 'react';
import { View, Text } from 'react-native';

import { UserDTO } from '../models/user/UserDTO';

interface LeaderboardItemProps {
  item: UserDTO;
  searchedUserName: string;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  item,
  searchedUserName,
}) => {
  const isHighlighted =
    searchedUserName?.toLowerCase() === item.name.toLowerCase();
  const highlightedText = isHighlighted ? 'text-white font-bold' : '';

  return (
    <View
      className={`p-2 rounded-md flex-row ${isHighlighted ? 'bg-primary' : 'bg-white'}`}
    >
      <Text className={`flex-[2] ${highlightedText}`}>{item.name}</Text>
      <Text className={`flex-1 ${highlightedText}`}>{item.rank}</Text>
      <Text className={`flex-1 ${highlightedText}`}>{item.bananas}</Text>
    </View>
  );
};

export default LeaderboardItem;
