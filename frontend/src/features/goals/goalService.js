import axios from 'axios';

const API_URL = 'http://localhost:3001/api/goals/';

const configureRequestWithToken = token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Get users goals from server
const getGoals = async token => {
  const response = await axios.get(API_URL, configureRequestWithToken(token));
  return response.data;
};

// Send new goal to server
const postGoal = async (goalData, token) => {
  const response = await axios.post(API_URL, goalData, configureRequestWithToken(token));
  return response.data;
}

const goalService = {
  getGoals,
  postGoal
};

export default goalService;