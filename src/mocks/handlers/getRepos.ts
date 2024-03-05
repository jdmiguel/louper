import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '@/utils/request';

const data = [
  {
    id: 1,
    name: 'Hello world',
    description: 'First repo with classic hello world',
    html_url: 'https://github.com/jdmiguel/hello_world',
    topics: ['javascript'],
  },
  {
    id: 2,
    name: 'To do app',
    description: 'Simple to do application',
    html_url: 'https://github.com/jdmiguel/to_do',
    topics: ['javascript', 'typescript'],
  },
  {
    id: 3,
    name: 'Calender',
    description: 'Calender application',
    html_url: 'https://github.com/jdmiguel/calender',
    topics: [],
  },
];

const handler = http.get(`${API_BASE_URL}/users/:userLogin/repos`, () => {
  return HttpResponse.json(data);
});

export { handler, data };
