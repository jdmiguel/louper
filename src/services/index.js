import axios from 'axios';

/**
 * get response status and set it as error.code
 * get response data and set it as error.message if response.data exits
 * else set error.message as null
 * @function handleError
 * @param {object} response
 * @param {error} error
 */
const handleError = ({ response }) => {
  const error = {
    code: response.status,
    message: response.data ? response.data.message : null
  };
  throw error;
};

/**
 * check any response and if its status is ok, the response is returned
 * else throw error
 * @function checkStatus
 * @param {object} response
 * @returns {object} response - object
 */
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

/**
 * check any response and return retrieved data property from the response
 * @function normalizeResponse
 * @param {object} response
 * @returns {object} data - object
 */
const normalizeResponse = response => response.data;

/**
 * create asynchronous call passing as parameter url string
 * and options object
 * check status, get response data and if any error exits, handle it
 * @function request
 * @param {string} url
 * @param {object} options
 * @returns {promise} axios
 */

export const request = (url, options = { method: 'get' }) =>
  axios({
    url,
    ...options
  })
    .then(checkStatus)
    .then(normalizeResponse)
    .catch(handleError);
