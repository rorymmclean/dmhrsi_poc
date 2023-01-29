import axios from 'axios';
import { store } from 'index';

export const ADD_REQUEST_TOKEN = 'ADD_REQUEST_TOKEN';
export const REMOVE_REQUEST_TOKEN = 'REMOVE_REQUEST_TOKEN';
export const CANCEL_TOKEN_BY_TAG = 'CANCEL_REQUEST_TOKEN';
export const HTTP_PUT_FILE = 'HTTP_PUT_FILE';

export function isCanceledRequest(axios, error) {
  return (
    axios.isCancel(error) || error?.toString().toLowerCase().includes('error: request aborted')
  );
}

export const showErrorNotification = (statusCode, url, error) => {
  let message = null;

  if (statusCode) {
    switch (statusCode) {
      case 401:
        message = `An error occurred, unauthorized access to ${url}`;
        break;
      case 403:
        message = `An error occurred, forbidden access to ${url}`;
        break;
      case 404:
        message = `An error occurred, endpoint not found ${url}`;
        break;
      case 500:
        message = `An error occurred, internal server error please contact system administrator ${url}`;
        break;
      case 503:
        message = `An error occurred, service unavailable please contact system administrator ${url}`;
        break;
      case 400:
        console.error(error?.response?.data);
        break;

      default:
        message = `Unknown error ${statusCode}`;
    }
  }
  return message;
};

//let servicesWithToken = JSON.parse(localStorage.getItem('login'));

export const fetcher = axios.create({
  baseURL: 'https://2wkr0zl4bl.execute-api.us-west-1.amazonaws.com/demo/'
});
// Add a request interceptor
fetcher.interceptors.request.use(
  async function (config) {
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    //const s = JSON.parse(localStorage.getItem('login')).store;

    //const accessToken = s;

    config.headers = headers;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    config.cancelToken = source.token;
    store.dispatch({
      type: ADD_REQUEST_TOKEN,
      url: config.url,
      cancel: source.cancel,
      tag: config.componentId,
      isCancellable: config.isCancellable
    });

    if (config.method === HTTP_PUT_FILE.toLowerCase()) {
      config.headers['Content-Type'] = 'binary/octet-stream';
      config.method = 'PUT';
    } else {
      // headers.Authorization = accessToken?.length ? 'Bearer ' + accessToken : '';
    }

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
fetcher.interceptors.response.use(
  function (response) {
    store.dispatch({
      type: REMOVE_REQUEST_TOKEN,
      url: response?.config?.url,
      tag: response?.config?.componentId,
      isCancellable: response?.config?.isCancellable
    });

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (isCanceledRequest(axios, error)) return Promise.reject(error);

    const { responseURL: url } = error.response?.request || {};
    if (!error?.response) {
      console.log('error');
    }
    showErrorNotification(error?.response?.status, url, error);
    return Promise.reject(error);
  }
);
