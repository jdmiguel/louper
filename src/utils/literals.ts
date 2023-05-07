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

export const NO_ITEMS_TEXT = {
  description: 'No description added',
  topics: 'NO TOPICS',
};

export const TOTAL_USER_ITEMS_ALLOWED = 100;
export enum TAB {
  repos,
  following,
  followers,
}
