import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../../../../mocks/server';
import { API_BASE_URL } from '../../../../utils/request';
import { renderWithTheme } from '../../../../utils/theme';
import Search from '..';

describe('<Search />', () => {
  const props = {
    onFetchUser: vi.fn(),
    onRequestError: vi.fn(),
  };

  it('displays the correct content', () => {
    render(renderWithTheme(<Search {...props} />));

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type user name...'));
    expect(screen.getByText('Search and find any Github user!')).toBeInTheDocument();
    expect(screen.getByTestId('watermark')).toBeInTheDocument();
  });

  describe('when typing no more than two chars', () => {
    it('displays the correct label error when clicking the search button', async () => {
      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jd');

      await userEvent.click(
        screen.getByRole('button', {
          name: /search/i,
        }),
      );

      const labelText = screen
        .getAllByText('Please, type three chars at least')
        .find((domElement) => domElement.tagName === 'LABEL');

      expect(labelText).toBeInTheDocument();
    });

    it('displays the correct label error when clicking the enter key', async () => {
      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jd');

      await userEvent.keyboard('{Enter}');

      const labelText = screen
        .getAllByText('Please, type three chars at least')
        .find((domElement) => domElement.tagName === 'LABEL');

      expect(labelText).toBeInTheDocument();
    });
  });

  describe('when typing more than two chars', () => {
    it('calls the correct callback when there is a 403 error', async () => {
      server.use(
        rest.get(`${API_BASE_URL}/search/users`, (_, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      expect(props.onRequestError).toHaveBeenCalledWith(
        'You have excedeed the maximum allowed request. Please, wait for a while',
      );
    });

    it('calls the correct callback when there is a 404 error', async () => {
      server.use(
        rest.get(`${API_BASE_URL}/search/users`, (_, res, ctx) => {
          return res(ctx.status(404));
        }),
      );

      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'bew');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      expect(props.onRequestError).toHaveBeenCalledWith('Please, choose an available user');
    });

    it('calls the correct callback when there is a 500 error', async () => {
      server.use(
        rest.get(`${API_BASE_URL}/search/users`, (_, res, ctx) => {
          return res(ctx.status(500));
        }),
      );

      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      expect(props.onRequestError).toHaveBeenCalledWith(
        'Sorry! there was an error on the server side.',
      );
    });

    it('displays the matched suggestions', async () => {
      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      const suggestions = await screen.findByRole('grid');
      expect(suggestions.children.length).toBe(9);

      expect(screen.getByText('jdm')).toBeInTheDocument();
      expect(screen.getByText('jdma')).toBeInTheDocument();
      expect(screen.getByText('jdmac')).toBeInTheDocument();
      expect(screen.getByText('jdmattheus')).toBeInTheDocument();
      expect(screen.getByText('jdme')).toBeInTheDocument();
      expect(screen.getByText('jdmfoil')).toBeInTheDocument();
      expect(screen.getByText('jdmiguel')).toBeInTheDocument();
      expect(screen.getByText('jdmfua')).toBeInTheDocument();
      expect(screen.getByText('jdmfuon')).toBeInTheDocument();
    });

    it('displays the pagination with the correct selected page', async () => {
      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      const pagination = screen.getByRole('navigation');
      const paginationItems = pagination.querySelectorAll('li');
      expect(paginationItems.length).toBe(2);

      expect(
        screen.getByRole('button', {
          name: /page 1/,
        }),
      ).toHaveClass('Mui-selected');
      expect(
        screen.getByRole('button', {
          name: /Go to page 2/,
        }),
      ).not.toHaveClass('Mui-selected');
    });

    it('hides the pagination after untyping', async () => {
      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      expect(screen.getByRole('navigation')).toBeInTheDocument();

      await userEvent.clear(screen.getByPlaceholderText('Type user name...'));

      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });

    it('displays the next matched suggestions when clicking next pagination', async () => {
      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      await userEvent.click(
        screen.getByRole('button', {
          name: /Go to page 2/,
        }),
      );

      const suggestions = screen.getByRole('grid');
      expect(suggestions.children.length).toBe(6);
      expect(screen.getByText('jdmut')).toBeInTheDocument();
      expect(screen.getByText('jdmqaa')).toBeInTheDocument();
      expect(screen.getByText('jdmnm')).toBeInTheDocument();
      expect(screen.getByText('jdmstr')).toBeInTheDocument();
      expect(screen.getByText('jdmld')).toBeInTheDocument();
      expect(screen.getByText('jdmx')).toBeInTheDocument();

      expect(
        screen.getByRole('button', {
          name: /Go to page 1/,
        }),
      ).not.toHaveClass('Mui-selected');
      expect(
        screen.getByRole('button', {
          name: /page 2/,
        }),
      ).toHaveClass('Mui-selected');
    });

    describe('when clicking a suggestion', () => {
      it('calls the correct callback', async () => {
        render(renderWithTheme(<Search {...props} />));

        const input = screen.getByPlaceholderText('Type user name...');
        await userEvent.type(input, 'jdm');

        const loader = await screen.findByRole('progressbar');
        await waitForElementToBeRemoved(loader);

        await userEvent.click(
          screen.getByRole('button', {
            name: /jdmiguel/i,
          }),
        );

        expect(screen.getByDisplayValue('jdmiguel')).toBeInTheDocument();

        expect(props.onFetchUser).toHaveBeenCalledWith({
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
        });
      });

      it('calls the correct callback when there is a 404 error', async () => {
        server.use(
          rest.get(`${API_BASE_URL}/users/:userLogin`, (_, res, ctx) => {
            return res(ctx.status(404));
          }),
        );

        render(renderWithTheme(<Search {...props} />));

        const input = screen.getByPlaceholderText('Type user name...');
        await userEvent.type(input, 'jdmiguel');

        const loader = await screen.findByRole('progressbar');
        await waitForElementToBeRemoved(loader);

        await userEvent.click(
          screen.getByRole('button', {
            name: /jdmiguel/i,
          }),
        );

        expect(props.onRequestError).toHaveBeenCalledWith('Please, choose an available user');
      });
    });
  });

  describe('when refining the search', () => {
    it('displays a specific suggestion', async () => {
      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdmiguel');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      const suggestions = screen.getByRole('grid');
      expect(suggestions.children.length).toBe(1);

      expect(screen.getByText('jdmiguel')).toBeInTheDocument();
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });

    it('does not display the pagination', async () => {
      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdmiguel');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });

    it('calls the correct callback when clicking the search button', async () => {
      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdmiguel');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      await userEvent.click(
        screen.getByRole('button', {
          name: /search/i,
        }),
      );

      expect(props.onFetchUser).toHaveBeenCalledWith({
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
      });
    });

    it('calls the correct callback when clicking the enter key', async () => {
      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdmiguel');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      await userEvent.keyboard('{Enter}');

      expect(props.onFetchUser).toHaveBeenCalledWith({
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
      });
    });
  });
});
