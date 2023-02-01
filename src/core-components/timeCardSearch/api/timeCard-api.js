import { END_POINTS } from 'endpoints.js';
import { formatParameterizedURL } from 'utils.js';
import { fetcher } from 'axios-helper.js';

export const getTimeCardListAPI = async data => {
  const endpoint = { ...END_POINTS.timeCard.getTimeCard };

  endpoint.url = formatParameterizedURL(endpoint.url, { search_string: data?.search_string });

  const response = await fetcher(endpoint);

  return response;
};

export const addTimeCardAPI = async data => {
  const endpoint = { ...END_POINTS.timeCard.addTimeCard };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};

export const getTimeCardDetailsAPI = async data => {
  const endpoint = { ...END_POINTS.timeCard.getTimeCardDetails };

  endpoint.url = formatParameterizedURL(endpoint.url, { id: data?.id });

  const response = await fetcher(endpoint);

  return response;
};

export const editTimeCardAPI = async data => {
  const endpoint = { ...END_POINTS.timeCard.editTimeCard };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};
