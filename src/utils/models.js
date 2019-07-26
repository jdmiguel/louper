import PropTypes from 'prop-types';

export const dataModel = PropTypes.arrayOf(PropTypes.any);

export const userDataModel = PropTypes.shape({
  avatar_url: PropTypes.string,
  name: PropTypes.string,
  bio: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  url: PropTypes.string,
  blog: PropTypes.string,
  company: PropTypes.string,
  html_url: PropTypes.string
});

export const reposDataModel = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    html_url: PropTypes.string
  })
);

export const followersDataModel = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    html_url: PropTypes.string,
    avatar_url: PropTypes.string
  })
);

export const followingDataModel = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    html_url: PropTypes.string,
    avatar_url: PropTypes.string
  })
);
