import { END_POINTS } from 'endpoints.js';
import { formatParameterizedURL } from 'utils.js';
import { fetcher } from 'axios-helper.js';



export const getTaskListAPI = async data => {
  const endpoint = { ...END_POINTS.task.getTask };
  
  endpoint.url = formatParameterizedURL(endpoint.url, { search_string: data?.search_string });

  const response = await fetcher(endpoint);

  return response;
};

export const addTaskAPI = async data => {
  const endpoint = { ...END_POINTS.task.addTask };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};


export const getTaskDetailsAPI = async data => {
  const endpoint = { ...END_POINTS.task.getTaskDetails };

  endpoint.url = formatParameterizedURL(endpoint.url, { id: data?.id });

  const response = await fetcher(endpoint);

  return response;
};
export const editTaskAPI = async data => {
  const endpoint = { ...END_POINTS.task.editTask };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};