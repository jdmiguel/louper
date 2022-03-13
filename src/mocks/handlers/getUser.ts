import { rest } from 'msw';

const data = {
  login: 'jdmiguel',
  html_url: 'https://github.com/jdmiguel',
  avatar_url: '',
  created_at: '2014-03-20T23:24:22Z',
  name: 'Jaime De Miguel',
  bio: 'Frontend developer',
  email: 'jdmiguel@gmail.com',
  location: 'Dublin',
  blog: 'https://jdmiguel.netlify.app/',
  company: 'Kitman Labs',
  public_repos: 30,
  followers: 12,
  following: 16,
};

const handler = rest.get(`${process.env.REACT_APP_BASE_URL}/users/:userLogin`, (_, res, ctx) =>
  res(ctx.json(data)),
);

export { handler, data };
