import axios from "axios";

const BASE_URL = "https://api.github.com";

export const getRepos = (username) => {
  const url = `${BASE_URL}/users/${username}/repos?per_page=250`;
  return axios.get(url).then(response => response.data);
}

export const getUserData = (username) => {
  return axios
    .all([
      axios.get(`${BASE_URL}/users/${username}`),
      axios.get(`${BASE_URL}/users/${username}/orgs`)
    ])
    .then(([user, orgs]) => ({
      user: user.data,
      orgs: orgs.data
    }));
}

export const getUserFollowers = (username) => {
  const url = `${BASE_URL}/users/${username}/followers?per_page=250`;
  return axios.get(url).then(response => response.data);
}

export const getUserFollowing = (username) => {
  const url = `${BASE_URL}/users/${username}/following?per_page=250`;
  return axios.get(url).then(response => response.data);
}