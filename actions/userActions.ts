import { SEARCH_USER_REQUEST } from '../actionTypes/userActionTypes';

export const searchUserRequestAction = (username: string) => ({
  type: SEARCH_USER_REQUEST,
  payload: username,
});
