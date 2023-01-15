import { END_POINTS } from 'endpoints.js';
import { formatParameterizedURL } from 'utils.js';
import { fetcher } from 'axios-helper.js';


export const getLaborcostsAPI = async data => {
  const endpoint = { ...END_POINTS.laborcosts };

  const response = await fetcher(endpoint);

  return response;
};