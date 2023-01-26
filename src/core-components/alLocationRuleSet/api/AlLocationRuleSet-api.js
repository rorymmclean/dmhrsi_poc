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

  endpoint.url = formatParameterizedURL(endpoint.url, { id: data?.id,RECORD_TYPE:data?.RECORD_TYPE });

  const response = await fetcher(endpoint);

  return response;
};

export const editAlLocationRuleSetAPI = async data => {
  const endpoint = { ...END_POINTS.alLocationRuleSet.editAlLocationRuleSet };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};


export const getArsetListAPI = async data => {
  const endpoint = { ...END_POINTS.alLocationRuleSet.getArsetList};

  endpoint.url = formatParameterizedURL(endpoint.url, { search_string: data?.search_string });

  const response = await fetcher(endpoint);

  return response;
};



export const editRuleSetAPI = async data => {
  const endpoint = { ...END_POINTS.alLocationRuleSet.editRuleSet };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};

export const addRuleSetAPI = async data => {
  const endpoint = { ...END_POINTS.alLocationRuleSet.addRuleSet  };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};

export const editTaskAPI = async data => {
  const endpoint = { ...END_POINTS.alLocationRuleSet.editTask  };
  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};

export const allocengineAPI = async data => {
  const endpoint = { ...END_POINTS.alLocationRuleSet.allocengine };
    endpoint.url = formatParameterizedURL(endpoint.url, { id: data?.id,date: data?.date});

  endpoint.data = data;
  const response = await fetcher(endpoint);

  return response;
};