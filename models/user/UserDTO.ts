export interface UserDTO {
  uid: string;
  name: string;
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  rank?: number;
  stars: number;
  subscribed: boolean;
}
