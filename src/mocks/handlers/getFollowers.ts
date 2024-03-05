import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '@/utils/request';

const data = [
  {
    id: 1,
    login: 'shara89',
    html_url: 'https://github.com/shara89',
    avatar_url: '',
  },
  {
    id: 2,
    login: 'malvinetto',
    html_url: 'https://github.com/malvinetto',
    avatar_url: '',
  },
  {
    id: 3,
    login: 'vini23',
    html_url: 'https://github.com/vini23',
    avatar_url: '',
  },
  {
    id: 4,
    login: 'nina45',
    html_url: 'https://github.com/nina45',
    avatar_url: '',
  },
  {
    id: 5,
    login: 'liniam31',
    html_url: 'https://github.com/liniam31',
    avatar_url: '',
  },
  {
    id: 6,
    login: 'trocPoe',
    html_url: 'https://github.com/trocPoe',
    avatar_url: '',
  },
  {
    id: 7,
    login: 'karl52',
    html_url: 'https://github.com/karl52',
    avatar_url: '',
  },
  {
    id: 8,
    login: 'finn142',
    html_url: 'https://github.com/finn142',
    avatar_url: '',
  },
];

const handler = http.get(`${API_BASE_URL}/users/:userLogin/followers`, () =>
  HttpResponse.json(data),
);

export { handler, data };
