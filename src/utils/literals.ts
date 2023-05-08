export const INTRO_TITLE = 'Search and find any Github user!';

export const FOOTER_CONTENT = {
  creation: '@2023 | created by',
  stats: 'github stats from',
};
export const FOOTER_LINKS = [
  {
    url: 'https://jdmiguel.com/',
    ariaLabel: 'View profile of jdmiguel on GitHub',
    content: 'jdmiguel',
  },
  {
    url: 'https://octoverse.github.com/#future',
    ariaLabel: 'View github users statistics on octoverse',
    content: 'octoverse',
  },
];

export const ERROR_MESSAGE_HEADING = 'Something went wrong:';
export const ERROR_MESSAGE = {
  max: 'You have excedeed the maximum allowed request. Please, wait for a while',
  noUser: 'Please, choose an available user',
  minChars: 'Please, type three chars at least',
  generic: 'Sorry! there was an error on the server side.',
};

export const FINDER_ICON = {
  placeholder: 'person',
  button: 'search',
};

export const OVERLAY_BOX_OFFSET_LEFT = 54;
export const OVERLAY_BOX_OFFSET_TOP = 16;

export const MIN_CHARS_TO_SEARCH_USERS = 2;
export const MAX_SUGGESTIONS_ALLOWED = 100;
export const SUGGESTIONS_PER_PAGE = 9;

export const TABS = ['REPOS', 'FOLLOWING', 'FOLLOWERS', 'SEARCH'];

export const UNAVAILABLE_ITEMS = {
  description: 'No description added',
  topics: 'NO TOPICS',
  users: 'No matched users',
};

export const TOTAL_USER_ITEMS_ALLOWED = 100;

export enum TAB {
  repos,
  following,
  followers,
}
export const SECTION_TYPE = {
  repos: 'repos',
  following: 'following',
  followers: 'followers',
};

export const LINK_TEXT = {
  profile: 'VISIT PROFILE',
  repo: 'VISIT REPO',
  portfolio: 'VISIT PORTFOLIO',
  email: 'SEND EMAIL',
};

export const ICON_TYPE = {
  repo: 'folder',
  repoItem: 'folder_open',
  following: 'visibility',
  followers: 'favorite',
  creationDate: 'event_note',
  location: 'location_on',
  company: 'business',
  profile: 'person',
  email: 'mail_outline',
  portfolio: 'web_icon',
  folder: 'folder',
};