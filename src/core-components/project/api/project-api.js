import { END_POINTS } from 'endpoints.js';
import { formatParameterizedURL } from 'utils.js';
import { fetcher } from 'axios-helper.js';

export const getProjectListAPI = async data => {
  const endpoint = { ...END_POINTS.project.getProject };

  endpoint.url = formatParameterizedURL(endpoint.url, { search_string: data?.search_string });

  const response = await fetcher(endpoint);

  return response;
};

export const addProjectAPI = async data => {
  const endpoint = { ...END_POINTS.project.addProject };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};

export const getProjectDetailsAPI = async data => {
  const endpoint = { ...END_POINTS.project.getProjectDetails };

  endpoint.url = formatParameterizedURL(endpoint.url, { id: data?.id });

  const response = await fetcher(endpoint);

  return response;
};
export const editProjectAPI = async data => {
  const endpoint = { ...END_POINTS.project.editProject };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};
