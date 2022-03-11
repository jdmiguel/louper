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

const handler = rest.get('https://api.github.com/users/:userLogin/repos', (_, res, ctx) =>
  res(ctx.json(data)),
);

export { handler, data };
