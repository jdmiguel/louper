export interface ResponseError extends Error {
  code: number;
}

export const BASE_URL = 'https://api.github.com';

export const handleErrors = (response: Response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};
