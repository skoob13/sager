import axios from 'axios';
import { isUri } from 'valid-url';

export const methods = ['get', 'post', 'patch', 'put', 'delete'];
export const prefixUrl = (path, endpoint) =>
  `${isUri(endpoint) ? '' : path}/${endpoint}`;

const request = method => (path, options = {}, token, authorizationName) => {
  const { body, params, headers = {} } = options;

  if (token) {
    headers.Authorization = `${authorizationName} ${token}`;
  }

  if (method === 'post' || method === 'patch' || method === 'put') {
    return axios[method](path, body, { headers });
  }

  return axios[method](path, {
    body,
    params,
    headers,
  });
};

const apiClient = methods.reduce((reduced, method) => ({
  ...reduced,
  [method]: request(method),
}), {});

export const makeRequest = (config, extenders = {}) => {
  const {
    authorizationName,
    method,
    path,
    token,
    url,
    request: requestConfig,
  } = { ...extenders, ...config };
  return apiClient[method](
    prefixUrl(path, url),
    requestConfig,
    token,
    authorizationName,
  );
};

export default apiClient;
