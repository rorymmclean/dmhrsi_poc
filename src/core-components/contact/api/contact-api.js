import { END_POINTS } from 'endpoints.js';
import { formatParameterizedURL } from 'utils.js';
import { fetcher } from 'axios-helper.js';

export const addContactAPI = async data => {
  const endpoint = { ...END_POINTS.contact.addContact };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};

export const getContactDetailsAPI = async data => {
  const endpoint = { ...END_POINTS.contact.getContactDetails };

  endpoint.url = formatParameterizedURL(endpoint.url, { id: data?.id });

  const response = await fetcher(endpoint);

  return response;
};
export const editContactAPI = async data => {
  const endpoint = { ...END_POINTS.contact.editContact };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};
