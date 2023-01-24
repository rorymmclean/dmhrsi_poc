import { END_POINTS } from 'endpoints.js';
import { formatParameterizedURL } from 'utils.js';
import { fetcher } from 'axios-helper.js';


export const getAlLocationRuleSetListAPI = async data => {
  const endpoint = { ...END_POINTS.alLocationRuleSet.getAlLocationRuleSet};

  endpoint.url = formatParameterizedURL(endpoint.url, { search_string: data?.search_string });

  const response = await fetcher(endpoint);

  return response;
};

export const addAlLocationRuleSetAPI = async data => {
  const endpoint = { ...END_POINTS.alLocationRuleSet.addAlLocationRuleSet  };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};

export const getAlLocationRuleSetDetailsAPI = async data => {
  const endpoint = { ...END_POINTS.alLocationRuleSet.getAlLocationRuleSetDetails };

  endpoint.url = formatParameterizedURL(endpoint.url, { id: data?.id });

  const response = await fetcher(endpoint);

  return response;
};

export const editAlLocationRuleSetAPI = async data => {
  const endpoint = { ...END_POINTS.alLocationRuleSet.editAlLocationRuleSet };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};


