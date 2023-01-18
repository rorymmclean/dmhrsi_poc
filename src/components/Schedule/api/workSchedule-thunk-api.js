import { END_POINTS } from 'endpoints.js';
import { formatParameterizedURL } from 'utils.js';
import { fetcher } from 'axios-helper.js';

//import {  getWorkScheduleAPI } from './workSchedule-api';

/*export const getTaskSearchThunk = createAsyncThunk('task/search', async (data, { dispatch }) => {
  console.log(data,'data')
  const response = await getWorkScheduleAPI(data);

  return response
});*/

export const getTaskSearchThunk = async data => {
  console.log("fetching")
  const endpoint = { ...END_POINTS.task.getTask };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await getWorkScheduleAPI(endpoint);
  console.log(response,'response233');
  return response;
};
