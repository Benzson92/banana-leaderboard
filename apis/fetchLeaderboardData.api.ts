import leaderboardData from '../assets/data/leaderboard.json'; // Import the JSON file
import { UserDTO } from '../models/user/UserDTO';

const fetchLeaderboardData = (): Promise<Record<string, UserDTO>> => {
  return new Promise((resolve, reject) => {
    try {
      const data: Record<string, UserDTO> = leaderboardData;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export default fetchLeaderboardData;
