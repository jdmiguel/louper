import { rest } from 'msw';

const users = {
  total_count: 15,
  items: [
    {
      id: 1,
      login: 'jdm',
      html_url: 'https://github.com/jdm',
      avatar_url: '',
    },
    {
      id: 2,
      login: 'jdm1',
      html_url: 'https://github.com/jdm1',
      avatar_url: '',
    },
    {
      id: 3,
      login: 'jdm12',
      html_url: 'https://github.com/jdm12',
      avatar_url: '',
    },
    {
      id: 4,
      login: 'jdm23',
      html_url: 'https://github.com/jdm23',
      avatar_url: '',
    },
    {
      id: 5,
      login: 'jdm34',
      html_url: 'https://github.com/jdm34',
      avatar_url: '',
    },
    {
      id: 6,
      login: 'jdm71',
      html_url: 'https://github.com/jdm71',
      avatar_url: '',
    },
    {
      id: 7,
      login: 'jdmiguel',
      html_url: 'https://github.com/jdmiguel',
      avatar_url: '',
    },
    {
      id: 8,
      login: 'jdmhmfd',
      html_url: 'https://github.com/jdmhmfd',
      avatar_url: '',
    },
    {
      id: 9,
      login: 'jdmrr',
      html_url: 'https://github.com/jdmrr',
      avatar_url: '',
    },
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
  ],
};

enum SearchQuery {
  Default = 'jdm',
  Filter = 'jdmi',
}

const handler = rest.get(`${process.env.REACT_APP_BASE_URL}/search/users`, (req, res, ctx) => {
  const query = req.url.searchParams;
  const searchQuery = query.get('q') || SearchQuery.Default;
  const currentPage = query.get('page');

  let pageData = {
    total_count: 12,
    items: users.items.slice(0, 9),
  };

  if (currentPage === '2') {
    pageData = { ...pageData, items: users.items.slice(9, 15) };
  }

  if (searchQuery.includes(SearchQuery.Filter)) {
    pageData = { total_count: 1, items: users.items.slice(6, 7) };
  }

  return res(ctx.json(pageData));
});

export { handler, users as data };
