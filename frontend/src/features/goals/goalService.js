import axios from 'axios';

const API_URL = 'http://localhost:3001/api/goals/';

// Get users goals from server
const getGoals = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(API_URL, config);

  return response.data
}

const goalService = {
  getGoals
};

export default goalService;