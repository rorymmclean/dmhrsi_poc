import { createAsyncThunk } from '@reduxjs/toolkit';
import { addPersonAPI, getPersonListAPI, getPersonDetailsAPI, editPersonAPI } from './person-api';

export const getPersonListThunk = createAsyncThunk('Person/list', async (data, { dispatch }) => {
  const response = await getPersonListAPI(data);

  return response;
});

export const addPersonThunk = createAsyncThunk('Person/add', async (data, { dispatch }) => {
  const response = await addPersonAPI(data);

  return response;
});

export const getPersonDetailsThunk = createAsyncThunk(
  'Person/Details',
  async (data, { dispatch }) => {
    const response = await getPersonDetailsAPI(data);

    return response;
  }
);

export const editPersonThunk = createAsyncThunk('Person/edit', async (data, { dispatch }) => {
  const response = await editPersonAPI(data);

  return response;
});
