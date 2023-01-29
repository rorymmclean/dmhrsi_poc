import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getTimeEntryListAPI,
  editTimeEntryAPI,
  addTimeEntryAPI,
  editTimeEntryTaskAPI
} from './timeEntry-api';

export const getTimeEntryListThunk = createAsyncThunk(
  'timeEntry/list',
  async (data, { dispatch }) => {
    const response = await getTimeEntryListAPI(data);

    return response;
  }
);

export const addTimeEntryThunk = createAsyncThunk('Entry/add', async (data, { dispatch }) => {
  const response = await addTimeEntryAPI(data);

  return response;
});

export const editTimeEntryThunk = createAsyncThunk('Entry/edit', async (data, { dispatch }) => {
  const response = await editTimeEntryAPI(data);

  return response;
});

export const editTimeEntryTaskThunk = createAsyncThunk(
  'Entry/editTask',
  async (data, { dispatch }) => {
    const response = await editTimeEntryTaskAPI(data);

    return response;
  }
);
