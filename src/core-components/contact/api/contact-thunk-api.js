import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContactAPI, getContactDetailsAPI, editContactAPI } from './contact-api';

export const addContactThunk = createAsyncThunk('Contact/add', async (data, { dispatch }) => {
  const response = await addContactAPI(data);

  return response;
});

export const getContactDetailsThunk = createAsyncThunk(
  'Contact/Details',
  async (data, { dispatch }) => {
    const response = await getContactDetailsAPI(data);

    return response;
  }
);

export const getContactDetailsPrimaryThunk = createAsyncThunk(
  'Contact/Details',
  async (data, { dispatch }) => {
    const response = await getContactDetailsAPI(data);
    let dataPrimary = [];

    for (let index = 0; index < JSON.parse(response.data.body).length; index++) {
      if (JSON.parse(response.data.body)[index]?.PRIMARY_FLAG == 'Y') {
        dataPrimary.push(JSON.parse(response.data.body)[index]);
      }
    }

    return dataPrimary;
  }
);
export const editContactThunk = createAsyncThunk('Contact/edit', async (data, { dispatch }) => {
  const response = await editContactAPI(data);

  return response;
});
