import { createSelector } from 'reselect';
import { RootState } from '../reducers/rootReducer';

const getUserState = (state: RootState) => state.user;

export const getUserStateSelector = createSelector(
  [getUserState],
  (userState) => ({
    searchedUserName: userState.searchedUserName,
  })
);
