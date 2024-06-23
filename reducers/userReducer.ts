import {
  SEARCH_USER_REQUEST,
  UserActionTypes,
} from '../actionTypes/userActionTypes';

interface UserState {
  searchedUserName: string;
}

const initialState: UserState = {
  searchedUserName: undefined,
};

const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SEARCH_USER_REQUEST:
      return { ...state, searchedUserName: action.payload };

    default:
      return state;
  }
};

export default userReducer;
