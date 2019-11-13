import PropTypes from 'prop-types';

export const userDataModel = PropTypes.shape({
  login: PropTypes.string,
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  bio: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  url: PropTypes.string,
  blog: PropTypes.string,
  company: PropTypes.string,
  htmlUrl: PropTypes.string,
  repos: PropTypes.number,
  followers: PropTypes.number,
  following: PropTypes.number
});

export const reposDataModel = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    html_url: PropTypes.string
  })
);

export const followDataModel = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    html_url: PropTypes.string,
    avatar_url: PropTypes.string
  })
);

export const menuTabsModel = PropTypes.shape({
  repos: PropTypes.number,
  following: PropTypes.number,
  followers: PropTypes.number
});
