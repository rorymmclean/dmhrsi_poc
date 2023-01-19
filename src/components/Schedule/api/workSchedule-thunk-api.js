import { createAsyncThunk } from '@reduxjs/toolkit';
import {getTaskListAPI } from './workSchedule-api';

export const getTaskListThunk = createAsyncThunk('Person/list', async (data, { dispatch }) => {
  const response = await getTaskListAPI(data);
  return response
});





