import { createAsyncThunk } from '@reduxjs/toolkit';
import { addAssignmentAPI, editAssignmentAPI, getAssignmentDetailsAPI } from './assignment-api';


export const addAssignmentThunk = createAsyncThunk('Assignment/add', async (data, { dispatch }) => {
  const response = await addAssignmentAPI(data);

  return response;
});


export const getAssignmentDetailsThunk = createAsyncThunk('Assignment/Details', async (data, { dispatch }) => {
  const response = await getAssignmentDetailsAPI(data);

  return response
})

export const editAssignmentThunk = createAsyncThunk('Assignment/edit', async (data, { dispatch }) => {
  const response = await editAssignmentAPI(data);

  return response;
});