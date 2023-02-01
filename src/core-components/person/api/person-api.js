import { END_POINTS } from 'endpoints.js';
import { formatParameterizedURL } from 'utils.js';
import { fetcher } from 'axios-helper.js';

export const getPersonListAPI = async data => {
  const endpoint = { ...END_POINTS.person.getPerson };

  endpoint.url = formatParameterizedURL(endpoint.url, { search_string: data?.search_string });

  const response = await fetcher(endpoint);

  return response;
};

export const addPersonAPI = async data => {
  const endpoint = { ...END_POINTS.person.addPerson };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};

export const getPersonDetailsAPI = async data => {
  const endpoint = { ...END_POINTS.person.getPersonDetails };

  endpoint.url = formatParameterizedURL(endpoint.url, { id: data?.id });

  const response = await fetcher(endpoint);

  return response;
};
export const editPersonAPI = async data => {
  const endpoint = { ...END_POINTS.person.editPerson };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};
