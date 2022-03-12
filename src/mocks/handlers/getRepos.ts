import { rest } from 'msw';

const data = [
  {
    id: 1,
    name: 'Hello world',
    description: 'First repo with classic hello world',
    html_url: 'https://github.com/JohnDoe/hello_world',
    topics: ['javascript'],
  },
  {
    id: 2,
    name: 'To do app',
    description: 'Simple to do application',
    html_url: 'https://github.com/JohnDoe/to_do',
    topics: ['javascript', 'typescript'],
  },
  {
    id: 3,
    name: 'Calender',
    description: 'Calender application',
    html_url: 'https://github.com/JohnDoe/calender',
    topics: [],
  },
];

const handler = rest.get(`${process.env.REACT_APP_BASE_URL}/users/jdoe/repos`, (_, res, ctx) => {
  console.log('handler');
  return res(ctx.json(data));
});

export { handler, data };
