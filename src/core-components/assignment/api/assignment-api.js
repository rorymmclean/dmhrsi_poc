import { END_POINTS } from 'endpoints.js';
import { formatParameterizedURL } from 'utils.js';
import { fetcher } from 'axios-helper.js';

export const addAssignmentAPI = async data => {
  const endpoint = { ...END_POINTS.assignment.addAssignment };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};

export const getAssignmentDetailsAPI = async data => {
  const endpoint = { ...END_POINTS.assignment.getAssignmentDetails };

  endpoint.url = formatParameterizedURL(endpoint.url, { search_string: data?.search_string });

  const response = await fetcher(endpoint);

  return response;
};
export const editAssignmentAPI = async data => {
  const endpoint = { ...END_POINTS.assignment.editAssignment };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};
