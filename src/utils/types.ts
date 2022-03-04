import { Keyframes } from '@emotion/serialize';

export type SectionType = 'repos' | 'following' | 'followers';

export type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
};

export type User = {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
};

export type Items = Repo[] & User[];

export type UsersData = {
  total_count: number;
  items: User[] | [];
};

export type UserData = {
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

export type ResponseError = Error & {
  status: number;
};

export type Animation = {
  greet: Keyframes;
};
