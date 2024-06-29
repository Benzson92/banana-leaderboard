import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

import { SortBy, OrderBy } from '../types/sortTypes';
import { getSortButtonColor } from '../utils/getSortButtonColor.util';

interface SortButtonProps extends PressableProps {
  sortBy: SortBy;
  orderBy: OrderBy;
  text: string;
  currentSortBy: SortBy;
  currentOrderBy: OrderBy;
  buttonClassName?: string;
}

const SortButton: React.FC<SortButtonProps> = ({
  onPress,
  sortBy,
  orderBy,
  text,
  currentSortBy,
  currentOrderBy,
  buttonClassName,
}) => {
  const { borderColor, textColor } = getSortButtonColor({
    sortBy,
    orderBy,
    currentSortBy,
    currentOrderBy,
  });

  return (
    <Pressable
      onPress={onPress}
      className={`border ${borderColor} p-2 rounded-md h-9 justify-center ${buttonClassName}`}
    >
      <Text className={`${textColor} text-center`}>{text}</Text>
    </Pressable>
  );
};

export default SortButton;
