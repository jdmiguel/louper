import { rest } from 'msw';
import { UsersData } from '../../utils/types';

const users = [
  {
    id: 1,
    login: 'jdm',
    html_url: 'https://github.com/jdm',
    avatar_url: '',
  },
  {
    id: 2,
    login: 'jdma',
    html_url: 'https://github.com/jdma',
    avatar_url: '',
  },
  {
    id: 3,
    login: 'jdmac',
    html_url: 'https://github.com/jdmac',
    avatar_url: '',
  },
  {
    id: 4,
    login: 'jdmattheus',
    html_url: 'https://github.com/jdmattheus',
    avatar_url: '',
  },
  {
    id: 5,
    login: 'jdme',
    html_url: 'https://github.com/jdme',
    avatar_url: '',
  },
  {
    id: 6,
    login: 'jdmfoil',
    html_url: 'https://github.com/jdmfoil',
    avatar_url: '',
  },

  {
    id: 7,
    login: 'jdmfua',
    html_url: 'https://github.com/jdmfua',
    avatar_url: '',
  },
  {
    id: 8,
    login: 'jdmfuon',
    html_url: 'https://github.com/jdmfuon',
    avatar_url: '',
  },
  {
    id: 9,
    login: 'jdmiguel',
    html_url: 'https://github.com/jdmiguel',
    avatar_url: '',
  },
];

const extraUsers = [
  {
    id: 10,
    login: 'jdmut',
    html_url: 'https://github.com/jdmut',
    avatar_url: '',
  },
  {
    id: 11,
    login: 'jdmqaa',
    html_url: 'https://github.com/jdmqaa',
    avatar_url: '',
  },
  {
    id: 12,
    login: 'jdmnm',
    html_url: 'https://github.com/jdmnm',
    avatar_url: '',
  },
  {
    id: 13,
    login: 'jdmstr',
    html_url: 'https://github.com/jdmstr',
    avatar_url: '',
  },
  {
    id: 14,
    login: 'jdmld',
    html_url: 'https://github.com/jdmld',
    avatar_url: '',
  },
  {
    id: 15,
    login: 'jdmx',
    html_url: 'https://github.com/jdmx',
    avatar_url: '',
  },
];

const totalUsers = [...users, ...extraUsers];

const getUsersData = (searchQuery: string, currentPage: string): UsersData => {
  if (searchQuery === 'jdmiguel') {
    return {
      total_count: 1,
      items: users.slice(users.length - 1, users.length),
    };
  }

  if (searchQuery === 'jdm') {
    return {
      total_count: 15,
      items: currentPage === '1' ? [...users] : [...extraUsers],
    };
  }

  return {
    total_count: 0,
    items: [],
  };
};

const handler = rest.get(`${process.env.REACT_APP_BASE_URL}/search/users`, (req, res, ctx) => {
  const query = req.url.searchParams;
  const searchQuery = query.get('q');
  const currentPage = query.get('page');

  const usersData = getUsersData(searchQuery || '', currentPage || '1');

  return res(ctx.json(usersData));
});

export { handler, totalUsers as data };
