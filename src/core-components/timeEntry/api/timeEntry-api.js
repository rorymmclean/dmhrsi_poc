import { END_POINTS } from 'endpoints.js';
import { formatParameterizedURL } from 'utils.js';
import { fetcher } from 'axios-helper.js';


export const getTimeEntryListAPI = async data => {
  const endpoint = { ...END_POINTS.timeEntry.getTimeEntry };

  endpoint.url = formatParameterizedURL(endpoint.url, { search_string: data?.search_string });

  const response = await fetcher(endpoint);

  return response;
};