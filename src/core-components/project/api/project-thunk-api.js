import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addProjectAPI,
  editProjectAPI,
  getProjectDetailsAPI,
  getProjectListAPI
} from './project-api';

export const getProjectListThunk = createAsyncThunk('Project/list', async (data, { dispatch }) => {
  const response = await getProjectListAPI(data);

  return response;
});

export const addProjectThunk = createAsyncThunk('Project/add', async (data, { dispatch }) => {
  const response = await addProjectAPI(data);
  return response;
});

export const getProjectDetailsThunk = createAsyncThunk(
  'Project/Details',
  async (data, { dispatch }) => {
    const response = await getProjectDetailsAPI(data);

    return response;
  }
);

export const editProjectThunk = createAsyncThunk('Project/edit', async (data, { dispatch }) => {
  const response = await editProjectAPI(data);

  return response;
});
