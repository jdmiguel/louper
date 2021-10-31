const BASE_URL = 'https://api.github.com';

const handleErrors = (response: Response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export const abortControllerUserData = new AbortController();
export const fetchUserData = (username: string) =>
  fetch(`${BASE_URL}/users/${username}`, { signal: abortControllerUserData.signal }).then(
    handleErrors,
  );

export const abortControllerRepos = new AbortController();
export const fetchRepos = (username: string) =>
  fetch(`${BASE_URL}/users/${username}/repos`, { signal: abortControllerRepos.signal }).then(
    handleErrors,
  );

export const abortControllerFollowing = new AbortController();
export const fetchFollowing = (username: string) =>
  fetch(`${BASE_URL}/users/${username}/following`, {
    signal: abortControllerFollowing.signal,
  }).then(handleErrors);

export const abortControllerFollowers = new AbortController();
export const fetchFollowers = (username: string) =>
  fetch(`${BASE_URL}/users/${username}/followers`, {
    signal: abortControllerFollowers.signal,
  }).then(handleErrors);
