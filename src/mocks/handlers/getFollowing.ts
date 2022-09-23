import { rest } from 'msw';
import { API_BASE_URL } from '@/utils';

const data = [
  {
    id: 1,
    login: 'phiLands',
    html_url: 'https://github.com/phiLands',
    avatar_url: 'https://github.com/phiLands.jpg',
  },
  {
    id: 2,
    login: 'rani234',
    html_url: 'https://github.com/rani234',
    avatar_url: '',
  },
  {
    id: 3,
    login: 'linu',
    html_url: 'https://github.com/linu',
    avatar_url: '',
  },
  {
    id: 4,
    login: 'pani34',
    html_url: 'https://github.com/pani',
    avatar_url: '',
  },
  {
    id: 5,
    login: 'alb009',
    html_url: 'https://github.com/alb',
    avatar_url: '',
  },
];

const handler = rest.get(`${API_BASE_URL}/users/:userLogin/following`, (_, res, ctx) =>
  res(ctx.json(data)),
);

export { handler, data };
