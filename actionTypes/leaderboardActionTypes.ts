import { UserDTO } from '../models/user/UserDTO';
import { LeaderboardRequestPayloadDTO } from '../models/leaderboard/LeaderboardActionDTO';

export const FETCH_LEADERBOARD_REQUEST = 'FETCH_LEADERBOARD_REQUEST';
export const FETCH_LEADERBOARD_SUCCESS = 'FETCH_LEADERBOARD_SUCCESS';
export const FETCH_LEADERBOARD_FAILURE = 'FETCH_LEADERBOARD_FAILURE';

export interface FetchLeaderboardRequestAction {
  type: typeof FETCH_LEADERBOARD_REQUEST;
  payload: LeaderboardRequestPayloadDTO;
}

export interface FetchLeaderboardSuccessAction {
  type: typeof FETCH_LEADERBOARD_SUCCESS;
  payload: UserDTO[];
}

export interface FetchLeaderboardFailureAction {
  type: typeof FETCH_LEADERBOARD_FAILURE;
  payload: string;
}

export type LeaderboardActionTypes =
  | FetchLeaderboardRequestAction
  | FetchLeaderboardSuccessAction
  | FetchLeaderboardFailureAction;
