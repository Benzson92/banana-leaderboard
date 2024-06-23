import React from 'react';
import { Pressable, Text } from 'react-native';

import { SortBy, OrderBy } from '../types/sortTypes';
import { getSortButtonColor } from '../utils/getSortButtonColor.util';

interface SortButtonProps {
  sortBy: SortBy;
  orderBy: OrderBy;
  text: string;
  currentSortBy: SortBy;
  currentOrderBy: OrderBy;
  handleSort: (sortBy: SortBy, orderBy: OrderBy) => void;
  style?: string;
}

const SortButton: React.FC<SortButtonProps> = ({
  sortBy,
  orderBy,
  text,
  currentSortBy,
  currentOrderBy,
  handleSort,
  style,
}) => {
  const { borderColor, textColor } = getSortButtonColor({
    sortBy,
    orderBy,
    currentSortBy,
    currentOrderBy,
  });

  return (
    <Pressable
      onPress={() => handleSort(sortBy, orderBy)}
      className={`border ${borderColor} p-2 rounded-md h-9 justify-center ${style}`}
    >
      <Text className={`${textColor} text-center`}>{text}</Text>
    </Pressable>
  );
};

export default SortButton;
