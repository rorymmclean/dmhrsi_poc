import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAlLocationRuleSetListAPI ,addAlLocationRuleSetAPI, getAlLocationRuleSetDetailsAPI, editAlLocationRuleSetAPI} from './AlLocationRuleSet-api';


export const getAlLocationRuleSetListThunk = createAsyncThunk('AlLocationRuleSet/list', async (data, { dispatch }) => {
  const response = await getAlLocationRuleSetListAPI(data);

  return response
})

export const addAlLocationRuleSetThunk = createAsyncThunk('AlLocationRuleSet/add', async (data, { dispatch }) => {
  const response = await addAlLocationRuleSetAPI(data);

  return response;
});

export const getAlLocationRuleSetDetailsThunk = createAsyncThunk('AlLocationRuleSet/Details', async (data, { dispatch }) => {
  const response = await getAlLocationRuleSetDetailsAPI(data);

  return response
} )

export const editAlLocationRuleSetThunk = createAsyncThunk('AlLocationRuleSet/edit', async (data, { dispatch }) => {
  const response = await editAlLocationRuleSetAPI(data);

  return response;
});