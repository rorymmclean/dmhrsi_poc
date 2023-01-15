import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLaborcostsAPI} from './laborcosts-api';

export const getLaborcostsThunk = createAsyncThunk('laborcosts/get', async (data, { dispatch }) => {
  const response = await getLaborcostsAPI(data);

  return response
})
