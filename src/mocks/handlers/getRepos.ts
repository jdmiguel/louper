import { rest } from 'msw';

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

const handler = rest.get(
  `${process.env.REACT_APP_BASE_URL}/users/:userLogin/repos`,
  (_, res, ctx) => {
    return res(ctx.json(data));
  },
);

export { handler, data };
