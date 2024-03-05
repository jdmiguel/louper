import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../../utils/request';
import { Users } from '../../utils/types';

const users = [
  {
    id: 1,
    login: 'jdm',
    html_url: 'https://github.com/jdm',
    url: 'https://github.com/jdm',
    avatar_url: '',
    node_id: '',
    gravatar_id: '',
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
    site_admin: true,
    score: 1424,
  },
  {
    id: 2,
    login: 'jdma',
    html_url: 'https://github.com/jdma',
    url: 'https://github.com/jdma',
    avatar_url: '',
    node_id: '',
    gravatar_id: '',
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
    site_admin: true,
    score: 1428,
  },
  {
    id: 3,
    login: 'jdmac',
    html_url: 'https://github.com/jdmac',
    url: 'https://github.com/jdmac',
    avatar_url: '',
    node_id: '',
    gravatar_id: '',
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
    site_admin: true,
    score: 1452,
  },
  {
    id: 4,
    login: 'jdmattheus',
    html_url: 'https://github.com/jdmattheus',
    url: 'https://github.com/jdmattheus',
    avatar_url: '',
    node_id: '',
    gravatar_id: '',
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
    site_admin: true,
    score: 1478,
  },
  {
    id: 5,
    login: 'jdmav',
    html_url: 'https://github.com/jdmav',
    url: 'https://github.com/jdmav',
    avatar_url: '',
    node_id: '',
    gravatar_id: '',
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
    site_admin: true,
    score: 1480,
  },
  {
    id: 6,
    login: 'jdmaw',
    html_url: 'https://github.com/jdmaw',
    url: 'https://github.com/jdmaw',
    avatar_url: '',
    node_id: '',
    gravatar_id: '',
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
    site_admin: true,
    score: 1484,
  },
];

const extraUsers = [
  {
    id: 7,
    login: 'jdmit',
    html_url: 'https://github.com/jdmit',
    url: 'https://github.com/jdmit',
    avatar_url: '',
    node_id: '',
    gravatar_id: '',
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
    site_admin: true,
    score: 1492,
  },
  {
    id: 8,
    login: 'jdmiguel',
    html_url: 'https://github.com/jdmiguel',
    url: 'https://github.com/jdmiguel',
    avatar_url: '',
    node_id: '',
    gravatar_id: '',
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
    site_admin: true,
    score: 1494,
  },
];

const totalUsers = [...users, ...extraUsers];

const getUsers = (searchQuery: string, currentPage: string): Users => {
  if (searchQuery === 'jdmiguel') {
    return {
      total_count: 1,
      items: extraUsers.slice(extraUsers.length - 1, extraUsers.length),
    };
  }

  if (searchQuery === 'jdm') {
    return {
      total_count: 8,
      items: currentPage === '1' ? [...users] : [...extraUsers],
    };
  }

  return {
    total_count: 0,
    items: [],
  };
};

const handler = http.get(`${API_BASE_URL}/search/users`, ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams;
  const searchQuery = query.get('q');
  const currentPage = query.get('page');

  const users = getUsers(searchQuery || '', currentPage || '1');

  return HttpResponse.json(users);
});

export { handler, totalUsers as data };
