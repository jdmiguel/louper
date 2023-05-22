import { UserItemsType } from './types';

export const INTRO_TITLE = 'Seek and find any Github user worldwide';
export const SEARCH_PLACEHOLDER = 'Type user name...';

export const GLOBE_ACTIVATE_ROTATION_TIMER = 800;

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
export const MAX_SUGGESTIONS_ALLOWED = 80;
export const SUGGESTIONS_PER_PAGE = 6;

export const TABS = ['REPOS', 'FOLLOWING', 'FOLLOWERS', 'SEARCH'];

export const UNAVAILABLE_ITEMS = {
  description: 'No description added',
  users: 'No matched users',
};

export const TOTAL_USER_ITEMS_ALLOWED = 80;

export enum TAB {
  repos,
  following,
  followers,
  search,
}
export const USER_ITEMS_TYPE: Record<string, UserItemsType> = {
  repos: 'repos',
  following: 'following',
  followers: 'followers',
};

export const REPOS_PER_PAGE = 12;
export const RELATED_USERS_PER_PAGE = 20;

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

export const DEFAULT_USER = {
  login: '',
  id: 0,
  node_id: '',
  url: '',
  html_url: '',
  avatar_url: '',
  followers_url: '',
  following_url: '',
  gists_url: '',
  starred_url: '',
  subscriptions_url: '',
  organizations_url: '',
  repos_url: '',
  events_url: '',
  received_events_url: '',
  type: '',
  site_admin: false,
  hireable: false,
  gravatar_id: '',
  created_at: '',
  updated_at: '',
  name: '',
  bio: '',
  email: '',
  location: '',
  blog: '',
  company: '',
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  twitter_username: '',
};

export const DEFAULT_USERS = {
  total_count: 0,
  items: [],
};
