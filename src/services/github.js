import { request } from '.';

const BASE_URL = 'https://api.github.com';

export const getUserData = user => request(`${BASE_URL}/users/${user}`);

export const getRepos = username =>
  request(`${BASE_URL}/users/${username}/repos?per_page=250`);

export const getFollowers = username =>
  request(`${BASE_URL}/users/${username}/followers`);

export const getFollowing = username =>
  request(`${BASE_URL}/users/${username}/following`);

export const getStarred = username =>
  request(`${BASE_URL}/users/${username}/starred`);
