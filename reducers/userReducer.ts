import {
  SEARCH_USER_REQUEST,
  // SEARCH_USER_SUCCESS,
  // SEARCH_USER_FAILURE,
  UserActionTypes,
} from '../actionTypes/userActionTypes';
// import { UserDTO } from '../models/user/UserDTO';

interface UserState {
  searchedUserName: string;
  // searchedUser: UserDTO;
  // error: string;
}

const initialState: UserState = {
  searchedUserName: undefined,
  // searchedUser: null,
  // error: null,
};

const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SEARCH_USER_REQUEST:
      return { ...state, searchedUserName: action.payload };

    // case SEARCH_USER_SUCCESS:
    //   return { ...state, searchedUser: action.payload, error: null };

    // case SEARCH_USER_FAILURE:
    //   return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
