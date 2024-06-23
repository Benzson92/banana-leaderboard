import { createSelector } from 'reselect';
import { RootState } from '../reducers/rootReducer';

const getUserState = (state: RootState) => state.user;

export const getUserStateSelector = createSelector(
  [getUserState],
  (userState) => ({
    searchedUser: userState.searchedUser,
    searchedUserName: userState.searchedUserName,
    error: userState.error,
  })
);

// export const getSearchedUser = createSelector(
//   [getUserState],
//   (userState) => userState.searchedUser
// );

// export const getUserError = createSelector(
//   [getUserState],
//   (userState) => userState.error
// );
