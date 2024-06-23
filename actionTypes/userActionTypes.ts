export const SEARCH_USER_REQUEST = 'SEARCH_USER_REQUEST';

export interface SearchUserRequestAction {
  type: typeof SEARCH_USER_REQUEST;
  payload: string;
}

export type UserActionTypes = SearchUserRequestAction;
