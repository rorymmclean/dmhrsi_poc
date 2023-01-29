import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTaskAPI, editTaskAPI, getTaskDetailsAPI, getTaskListAPI } from './task-api';

export const getTaskListThunk = createAsyncThunk('Task/list', async (data, { dispatch }) => {
  const response = await getTaskListAPI(data);

  return response;
});

export const addTaskThunk = createAsyncThunk('Task/add', async (data, { dispatch }) => {
  const response = await addTaskAPI(data);

  return response;
});

export const getTaskDetailsThunk = createAsyncThunk('Task/Details', async (data, { dispatch }) => {
  const response = await getTaskDetailsAPI(data);

  return response;
});

export const editTaskThunk = createAsyncThunk('Task/edit', async (data, { dispatch }) => {
  const response = await editTaskAPI(data);

  return response;
});
