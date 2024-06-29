import React from 'react';
import { View, Text } from 'react-native';

const LeaderboardHeader: React.FC = () => {
  return (
    <View className="flex-row justify-between items-center bg-gray-200 p-2 rounded-md">
      <Text className="flex-[2] font-bold">Name</Text>
      <Text className="flex-1 font-bold">Rank</Text>
      <Text className="flex-1 font-bold">Number of bananas</Text>
    </View>
  );
};

export default LeaderboardHeader;
