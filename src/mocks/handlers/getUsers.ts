import { rest } from 'msw';

const firstPageData = {
  total_count: 14,
  items: [
    {
      id: 1,
      login: 'jdoe',
      html_url: 'https://github.com/JohnDoe',
      avatar_url: '',
    },
    {
      id: 2,
      login: 'janeD12',
      html_url: 'https://github.com/JaneDoe',
      avatar_url: '',
    },
    {
      id: 3,
      login: 'jen21',
      html_url: 'https://github.com/JenNilligan',
      avatar_url: '',
    },
    {
      id: 4,
      login: 'joshP',
      html_url: 'https://github.com/JoshPhillip',
      avatar_url: '',
    },
    {
      id: 5,
      login: 'jani084',
      html_url: 'https://github.com/JanetNicklaus',
      avatar_url: '',
    },
    {
      id: 6,
      login: 'jidl',
      html_url: 'https://github.com/Jdil',
      avatar_url: '',
    },
    {
      id: 7,
      login: 'jomp',
      html_url: 'https://github.com/Jomp',
      avatar_url: '',
    },
    {
      id: 8,
      login: 'jen21',
      html_url: 'https://github.com/JenNilligan',
      avatar_url: '',
    },

    {
      id: 9,
      login: 'jediAnak',
      html_url: 'https://github.com/JediAnakin',
      avatar_url: '',
    },
    {
      id: 10,
      login: 'jediObi',
      html_url: 'https://github.com/JedyObi',
      avatar_url: '',
    },
    {
      id: 11,
      login: 'jediYod',
      html_url: 'https://github.com/JediYoda',
      avatar_url: '',
    },
    {
      id: 12,
      login: 'JediLuk',
      html_url: 'https://github.com/JediLuke',
      avatar_url: '',
    },
  ],
};

const secondPageData = {
  total_count: 14,
  items: [
    {
      id: 13,
      login: 'jediBun',
      html_url: 'https://github.com/JediBundu',
      avatar_url: '',
    },
    {
      id: 14,
      login: 'jediLei',
      html_url: 'https://github.com/JediLeia',
      avatar_url: '',
    },
  ],
};

const handler = rest.get(`${process.env.REACT_APP_BASE_URL}/search/users`, (req, res, ctx) => {
  const query = req.url.searchParams;
  const currentPage = query.get('page');
  const pageData = currentPage === '2' ? secondPageData : firstPageData;

  return res(ctx.json(pageData));
});

export { handler, firstPageData as data };
