export type View = 'home' | 'user';

export type BasicUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
};

export type Users = {
  total_count: number;
  items: BasicUser[] | [];
};

export type User = Omit<BasicUser, 'score'> & {
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
};
export type SimplifiedUser = Pick<BasicUser, 'id' | 'login' | 'html_url' | 'avatar_url'>;
export type UserItems = Repo[] & SimplifiedUser[];
export type UserItemsType = 'repos' | 'following' | 'followers';

export type OverlayBoxData = {
  country: string;
  x: number;
  y: number;
  totalUsers: string;
};

export type Timer = ReturnType<typeof setTimeout>;
