import { UserDTO } from '../models/user/UserDTO';

export const SEARCH_USER_REQUEST = 'SEARCH_USER_REQUEST';
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
export const SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE';

export interface SearchUserRequestAction {
  type: typeof SEARCH_USER_REQUEST;
  payload: string;
}

export interface SearchUserSuccessAction {
  type: typeof SEARCH_USER_SUCCESS;
  payload: UserDTO;
}

export interface SearchUserFailureAction {
  type: typeof SEARCH_USER_FAILURE;
  payload: string;
}

export type UserActionTypes =
  | SearchUserRequestAction
  | SearchUserSuccessAction
  | SearchUserFailureAction;
