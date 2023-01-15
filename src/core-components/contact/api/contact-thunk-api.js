import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContactAPI,getContactDetailsAPI,editContactAPI } from './contact-api';


export const addContactThunk = createAsyncThunk('Contact/add', async (data, { dispatch }) => {
  const response = await addContactAPI(data);

  return response;
});


export const getContactDetailsThunk = createAsyncThunk('Contact/Details', async (data, { dispatch }) => {
  const response = await getContactDetailsAPI(data);

  return response
})

export const editContactThunk = createAsyncThunk('Contact/edit', async (data, { dispatch }) => {
  const response = await editContactAPI(data);

  return response;
});