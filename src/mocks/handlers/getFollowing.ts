import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '@/utils/request';

const data = [
  {
    id: 1,
    login: 'phiLands',
    html_url: 'https://github.com/phiLands',
    avatar_url: '',
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

const handler = http.get(`${API_BASE_URL}/users/:userLogin/following`, () =>
  HttpResponse.json(data),
);

export { handler, data };
