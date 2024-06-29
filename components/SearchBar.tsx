import React from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';

import SearchIcon from './icons/SearchIcon';

interface SearchBarProps {
  searchedUserName: string;
  handleChangeText: (text: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchedUserName,
  handleChangeText,
  handleSearch,
  isLoading,
}) => {
  return (
    <View className="flex-row justify-between px-4 mb-6">
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
        disabled={isLoading}
        onPress={handleSearch}
        className={`justify-center p-2 rounded-md flex-1 ml-2 bg-primary ${
          isLoading ? 'bg-gray-300' : ''
        }`}
      >
        <Text className="text-white text-center font-bold">Search</Text>
      </Pressable>
    </View>
  );
};

export default SearchBar;
