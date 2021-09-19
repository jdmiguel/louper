import checkPropTypes from 'check-prop-types';

/**
 * Return ShalloWrapper containing node(s) with the given data value
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */

export const findByTestAttr = (wrapper, val) =>
  wrapper.find(`[data-test="${val}"]`);

/**
 * Create error with checkPropTypes and logic implemented in order to
 * check that that error is undefined
 * @function checkProps
 * @param {JSX.Element} component - component whose properties are checked
 * @param {object} conformingProps - props checked
 */

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    // eslint-disable-next-line react/forbid-foreign-prop-types
    component.propTypes,
    conformingProps,
    'props',
    component.name,
  );

  expect(propError).toBeUndefined();
};

export const app = {
  finder: 'app-finder',
  userContent: 'app-userContent',
  footer: 'app-footer',
};

export const finder = {
  container: 'finder-container',
  githubCorner: 'finder-githubCorner',
  header: 'finder-header',
  input: 'finder-input',
  btn: 'finder-btn',
  loader: 'finder-loader',
  errorModal: 'finder-errorModal',
};

export const user = {
  menu: 'user-menu',
  floatBtn: 'user-floatBtn',
  profile: 'user-data',
  repos: 'user-repos',
  following: 'user-following',
  followers: 'user-followers',
};

export const menu = {
  container: 'menu-container',
  tabs: 'menu-tabs',
  tabUserData: 'menu-tab-userData',
  tabUserRepos: 'menu-tab-userRepos',
  tabUserFollowing: 'menu-tab-userFollowing',
  tabUserFollowers: 'menu-tab-userFollowers',
};

export const userData = {
  container: 'userData-container',
  image: 'userData-image',
  name: 'userData-name',
  bio: 'userData-bio',
  email: 'userData-email',
  location: 'userData-location',
  blog: 'userData-blog',
  company: 'userData-company',
};

export const userRepos = {
  container: 'userRepos-container',
  loader: 'userRepos-loader',
  item: 'userRepos-item',
  icon: 'userRepos-icon',
  name: 'userRepos-name',
};

export const userFollowing = {
  container: 'userFollowing-container',
  loader: 'userFollowing-loader',
  name: 'userFollowing-name',
  btn: 'userFollowing-btn',
  image: 'userFollowing-image',
};

export const userFollowers = {
  container: 'userFollowers-container',
  loader: 'userFollowers-loader',
  name: 'userFollowers-name',
  btn: 'userFollowers-btn',
  image: 'userFollowers-image',
};
