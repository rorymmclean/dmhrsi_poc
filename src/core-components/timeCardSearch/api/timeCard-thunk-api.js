import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTimeCardListAPI ,addTimeCardAPI, getTimeCardDetailsAPI, editTimeCardAPI } from './timeCard-api';


export const getTimeCardListThunk = createAsyncThunk('TimeCard/list', async (data, { dispatch }) => {
  const response = await getTimeCardListAPI(data);

  return response
})

export const addTimeCardThunk = createAsyncThunk('TimeCard/add', async (data, { dispatch }) => {
  const response = await addTimeCardAPI(data);

  return response;
});

export const getTimeCardDetailsThunk = createAsyncThunk('TimeCard/Details', async (data, { dispatch }) => {
  const response = await getTimeCardDetailsAPI(data);

  return response
})

export const editTimeCardThunk = createAsyncThunk('TimeCard/edit', async (data, { dispatch }) => {
  const response = await editTimeCardAPI(data);

  return response;
});

