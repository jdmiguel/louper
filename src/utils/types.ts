export type User = {
  login: string;
  avatar_url: string;
  created_at: string;
  name: string;
  bio: string;
  email: string;
  location: string;
  blog: string;
  company: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

export type Repo = {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
};

export type RelatedUser = {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
};
