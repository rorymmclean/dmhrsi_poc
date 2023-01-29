import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOrganizationListAPI,
  addOrganizationAPI,
  getOrganizationDetailsAPI,
  editOrganizationAPI,
  editContactAPI
} from './organization-api';

export const getOrganizationListThunk = createAsyncThunk(
  'Organization/list',
  async (data, { dispatch }) => {
    const response = await getOrganizationListAPI(data);

    return response;
  }
);

export const addOrganizationThunk = createAsyncThunk(
  'Organization/add',
  async (data, { dispatch }) => {
    const response = await addOrganizationAPI(data);

    return response;
  }
);

export const getOrganizationDetailsThunk = createAsyncThunk(
  'Organization/Details',
  async (data, { dispatch }) => {
    const response = await getOrganizationDetailsAPI(data);

    return response;
  }
);

export const editOrganizationThunk = createAsyncThunk(
  'Organization/edit',
  async (data, { dispatch }) => {
    const response = await editOrganizationAPI(data);

    return response;
  }
);

export const editContactThunk = createAsyncThunk(
  'Organization/Contact',
  async (data, { dispatch }) => {
    const response = await editContactAPI(data);

    return response;
  }
);
