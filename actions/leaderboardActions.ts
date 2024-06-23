import {
  FETCH_LEADERBOARD_REQUEST,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_LEADERBOARD_FAILURE,
} from '../actionTypes/leaderboardActionTypes';

import { LeaderboardRequestPayloadDTO } from '../models/leaderboard/LeaderboardActionDTO';
import { UserDTO } from '../models/user/UserDTO';

export const fetchLeaderboard = (payload: LeaderboardRequestPayloadDTO) => ({
  type: FETCH_LEADERBOARD_REQUEST,
  payload,
});

export const fetchLeaderboardSuccess = (data: UserDTO[]) => ({
  type: FETCH_LEADERBOARD_SUCCESS,
  payload: data,
});

export const fetchLeaderboardFailure = (error: string) => ({
  type: FETCH_LEADERBOARD_FAILURE,
  payload: error,
});
