const BASE_URL = "https://swapi.dev/api/";

const defaultParams = {
  format: "json",
};

const generateQueryParams = (params) => {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
};

export const Get = (url, options = {}) => {
  const params = Object.assign(options.params || {}, defaultParams);
  const paramsString = generateQueryParams(params);
  return fetch(
    options.fullUrl
      ? url
      : `${BASE_URL}${url}${paramsString ? `?${paramsString}` : ""}`
  );
};
