import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAlLocationRuleSetListAPI ,addAlLocationRuleSetAPI, getAlLocationRuleSetDetailsAPI, editAlLocationRuleSetAPI, getArsetListAPI, editRuleSetAPI, addRuleSetAPI, editTaskAPI, allocengineAPI, getRuleDetailsAPI} from './AlLocationRuleSet-api';


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
} );


export const getArsetListThunk = createAsyncThunk('getArsetList/list', async (data, { dispatch }) => {
  const response = await getArsetListAPI(data);

  return response
})

export const editRuleSetThunk = createAsyncThunk('editRuleSet/edit', async (data, { dispatch }) => {
  const response = await editRuleSetAPI(data);

  return response;
} );

export const addRuleSetThunk = createAsyncThunk('addRuleSetAPI/add', async (data, { dispatch }) => {
  const response = await addRuleSetAPI(data);

  return response;
});


export const editTaskThunk = createAsyncThunk('editTask/edit', async (data, { dispatch }) => {
  const response = await editTaskAPI(data);

  return response;
} );

export const allocengineThunk = createAsyncThunk('allocengine/get', async (data, { dispatch }) => {
  const response = await allocengineAPI(data);

  return response;
});

export const getRuleDetailsThunk = createAsyncThunk('getRuleDetails/get', async (data, { dispatch }) => {
  const response = await getRuleDetailsAPI(data);

  return response;
});

