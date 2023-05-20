import { rest } from 'msw';
import { API_BASE_URL } from '@/utils/request';
import { User } from '@/utils/types';

const data: User = {
  login: 'jdmiguel',
  id: 21145,
  node_id: '',
  gravatar_id: '',
  html_url: 'https://github.com/jdmiguel',
  url: 'https://github.com/jdmiguel',
  site_admin: true,
  avatar_url: '',
  created_at: '2014-03-20T23:24:22Z',
  updated_at: '2014-03-20T23:24:22Z',
  name: 'Jaime De Miguel',
  bio: 'Senior Frontend Engineer',
  email: 'jdmiguel@gmail.com',
  blog: 'jdmiguel.com',
  location: 'Dublin',
  company: 'Kitman Labs',
  public_repos: 30,
  followers: 12,
  followers_url: '',
  following: 16,
  following_url: '',
  gists_url: '',
  starred_url: '',
  subscriptions_url: '',
  organizations_url: '',
  repos_url: '',
  events_url: '',
  received_events_url: '',
  type: '',
  hireable: false,
  twitter_username: '',
  public_gists: 0,
};

const handler = rest.get(`${API_BASE_URL}/users/:userLogin`, (_, res, ctx) => res(ctx.json(data)));

export { handler, data };
