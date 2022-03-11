import { rest } from 'msw';

const data = {
  login: 'jdoe',
  html_url: 'https://github.com/JohnDoe',
  avatar_url: '',
  created_at: '2014-03-20T23:24:22Z',
  name: 'John Doe',
  bio: 'Frontend developer',
  email: 'jdoe@gmail.com',
  location: 'Dublin',
  blog: 'https://jdoe.netlify.app/',
  company: 'Google',
  public_repos: 30,
  followers: 12,
  following: 16,
};

const handler = rest.get('https://api.github.com/users/:userLogin', (_, res, ctx) =>
  res(ctx.json(data)),
);

export { handler, data };
