import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  // SearchUserAction,
  // SearchUserSuccessAction,
  // SearchUserFailureAction,
} from '../actionTypes/userActionTypes';
import { UserDTO } from '../models/user/UserDTO';

export const searchUserRequestAction = (username: string) => ({
  type: SEARCH_USER_REQUEST,
  payload: username,
});

export const searchUserSuccessAction = (user: UserDTO) => ({
  type: SEARCH_USER_SUCCESS,
  payload: user,
});

export const searchUserFailureAction = (error: string) => ({
  type: SEARCH_USER_FAILURE,
  payload: error,
});
