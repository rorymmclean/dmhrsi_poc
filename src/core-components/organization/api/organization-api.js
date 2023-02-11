import { END_POINTS } from 'endpoints.js';
import { formatParameterizedURL } from 'utils.js';
import { fetcher } from 'axios-helper.js';

export const getOrganizationListAPI = async data => {
  const endpoint = { ...END_POINTS.organization.getOrganization };

  endpoint.url = formatParameterizedURL(endpoint.url, { search_string: data?.search_string });

  const response = await fetcher(endpoint);

  return response;
};

export const addOrganizationAPI = async data => {
  const endpoint = { ...END_POINTS.organization.addOrganization };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};

export const getOrganizationDetailsAPI = async data => {
  const endpoint = { ...END_POINTS.organization.getOrganizationDetails };

  endpoint.url = formatParameterizedURL(endpoint.url, { id: data?.id });

  const response = await fetcher(endpoint);

  return response;
};

export const editOrganizationAPI = async data => {
  const endpoint = { ...END_POINTS.organization.editOrganization };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};

export const editContactAPI = async data => {
  const endpoint = { ...END_POINTS.contact.editContact };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};
