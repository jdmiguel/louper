/* services */
import request from './index';

const BASE_URL = 'https://api.github.com';

export const getUserData = (username: string) => request(`${BASE_URL}/users/${username}`);

export const getRepos = (username: string) =>
  request(`${BASE_URL}/users/${username}/repos?per_page=250`);

export const getFollowers = (username: string) =>
  request(`${BASE_URL}/users/${username}/followers`);

export const getFollowings = (username: string) =>
  request(`${BASE_URL}/users/${username}/following`);
