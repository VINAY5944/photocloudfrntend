import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rooturl from '../url';

export const fetchData = createAsyncThunk('yourData/fetchData', async () => {
  const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
  const userId = userInfo ? userInfo.Id : null;
  const token = userInfo ? userInfo.token : null;

  const apiUrl = `${rooturl}/api/images`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: userId,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    // Handle error if necessary
    throw error;
  }
});

const yourDataSlice = createSlice({
  name: 'yourData',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default yourDataSlice.reducer;

