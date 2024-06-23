import {
  FETCH_LEADERBOARD_REQUEST,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_LEADERBOARD_FAILURE,
  LeaderboardActionTypes,
} from '../actionTypes/leaderboardActionTypes';

import { UserDTO } from '../models/user/UserDTO';
import { DataStatus } from '../enums/DataStatusEnum';

import { SortBy, OrderBy } from '../types/sortTypes';

interface LeaderboardState {
  leaderboard: UserDTO[];
  status: DataStatus;
  sortBy: SortBy;
  orderBy: OrderBy;
  error: string;
}

const initialState: LeaderboardState = {
  leaderboard: [],
  status: DataStatus.IDLE,
  sortBy: undefined,
  orderBy: undefined,
  error: '',
};

const leaderboardReducer = (
  state = initialState,
  action: LeaderboardActionTypes
): LeaderboardState => {
  switch (action.type) {
    case FETCH_LEADERBOARD_REQUEST: {
      const { sortBy, orderBy } = action.payload;

      return {
        ...state,
        leaderboard: [],
        status: DataStatus.LOADING,
        sortBy,
        orderBy,
        error: '',
      };
    }

    case FETCH_LEADERBOARD_SUCCESS:
      return {
        ...state,
        leaderboard: action.payload,
        status: DataStatus.SUCCESSFUL,
        error: '',
      };

    case FETCH_LEADERBOARD_FAILURE:
      return {
        ...state,
        leaderboard: [],
        status: DataStatus.FAILED,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default leaderboardReducer;
