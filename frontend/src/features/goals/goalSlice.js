import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
  goals: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

// Get all goals for user
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.getGoals(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const postGoal = createAsyncThunk('goals/createGoal', async (goalData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.postGoal(goalData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
})

export const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getGoals.pending, state => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.goals = [];
        state.message = action.payload;
      })
      .addCase(postGoal.pending, state => {
        state.isLoading = true;
      })
      .addCase(postGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.goals.push(action.payload);
      })
      .addCase(postGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
  }
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;