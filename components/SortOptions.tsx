import React from 'react';
import { FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { StyledComponent } from 'nativewind';

import { SortBy, OrderBy, SortOption } from '../types/sortTypes';

import SortButton from './SortButton';

interface SortOptionsProps {
  sortOptions: SortOption[];
  currentSortBy: SortBy;
  currentOrderBy: OrderBy;
  handleSort: (sortBy: SortBy, orderBy: OrderBy) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  sortOptions,
  currentSortBy,
  currentOrderBy,
  handleSort,
}) => {
  const renderSortButtonItem: ListRenderItem<SortOption> = ({ item }) => (
    <SortButton
      onPress={() => handleSort(item.sortBy, item.orderBy)}
      sortBy={item.sortBy}
      orderBy={item.orderBy}
      text={item.text}
      currentSortBy={currentSortBy}
      currentOrderBy={currentOrderBy}
      buttonClassName="mx-2"
    />
  );

  return (
    <StyledComponent
      component={FlatList}
      horizontal
      data={sortOptions}
      renderItem={renderSortButtonItem}
      keyExtractor={(item: SortOption) => `${item.sortBy}-${item.orderBy}`}
      showsHorizontalScrollIndicator={false}
      className="flex-grow-0 mb-6"
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default SortOptions;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 8,
  },
});
