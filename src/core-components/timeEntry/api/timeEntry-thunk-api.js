import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTimeEntryListAPI} from './timeEntry-api';


export const getTimeEntryListThunk = createAsyncThunk('timeEntry/list', async (data, { dispatch }) => {
  const response = await getTimeEntryListAPI(data);

  return response
})
