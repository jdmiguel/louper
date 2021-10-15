import PropTypes from 'prop-types';

export const dataModel = PropTypes.shape({
  login: PropTypes.string,
  avatar_url: PropTypes.string,
  created_at: PropTypes.string,
  name: PropTypes.string,
  bio: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  url: PropTypes.string,
  blog: PropTypes.string,
  company: PropTypes.string,
  html_url: PropTypes.string,
  public_repos: PropTypes.number,
  followers: PropTypes.number,
  following: PropTypes.number,
});

export const reposModel = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    html_url: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.string),
  }),
);

export const followersModel = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    html_url: PropTypes.string,
    avatar_url: PropTypes.string,
  }),
);

export const followingModel = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    html_url: PropTypes.string,
    avatar_url: PropTypes.string,
  }),
);

export const menuTabsModel = PropTypes.shape({
  repos: PropTypes.number,
  followings: PropTypes.number,
  followers: PropTypes.number,
}).isRequired;
