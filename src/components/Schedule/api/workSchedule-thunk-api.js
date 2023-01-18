import { END_POINTS } from 'endpoints.js';
import { formatParameterizedURL } from 'utils.js';
import { fetcher } from 'axios-helper.js';
import {  getWorkScheduleAPI } from './workSchedule-api';
import { createAsyncThunk } from '@reduxjs/toolkit';



export const getTaskSearchThunk = createAsyncThunk('Task/search', async (data, { dispatch }) => {
  const response = await getWorkScheduleAPI(data);

  return response
});








