import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../../utils/theme';
import Search from '..';

describe('<Search />', () => {
  const props = {
    onFetchUser: jest.fn(),
    onRequestError: jest.fn(),
  };

  it('displays the correct content', () => {
    render(renderWithTheme(<Search {...props} />));

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type user name...'));
    expect(screen.getByText('Search and find any Github user!')).toBeInTheDocument();
    expect(screen.getByTestId('watermark')).toBeInTheDocument();
  });

  it('displays the matched suggestions when typing more than two chars', async () => {
    render(renderWithTheme(<Search {...props} />));

    const input = screen.getByPlaceholderText('Type user name...');
    await userEvent.type(input, 'jdm');

    const loader = await screen.findByRole('progressbar');
    await waitForElementToBeRemoved(loader);

    const suggestions = screen.getByTestId('suggestions');
    expect(suggestions.children.length).toBe(9);

    expect(screen.getByText('jdm')).toBeInTheDocument();
    expect(screen.getByText('jdm1')).toBeInTheDocument();
    expect(screen.getByText('jdm12')).toBeInTheDocument();
    expect(screen.getByText('jdm23')).toBeInTheDocument();
    expect(screen.getByText('jdm34')).toBeInTheDocument();
    expect(screen.getByText('jdm71')).toBeInTheDocument();
    expect(screen.getByText('jdmiguel')).toBeInTheDocument();
    expect(screen.getByText('jdmhmfd')).toBeInTheDocument();
    expect(screen.getByText('jdmrr')).toBeInTheDocument();
  });

  it('displays a specific suggestion when refining the search', async () => {
    render(renderWithTheme(<Search {...props} />));

    const input = screen.getByPlaceholderText('Type user name...');
    await userEvent.type(input, 'jdmi');

    const loader = await screen.findByRole('progressbar');
    await waitForElementToBeRemoved(loader);

    const suggestions = screen.getByTestId('suggestions');
    expect(suggestions.children.length).toBe(1);

    expect(screen.getByText('jdmiguel')).toBeInTheDocument();
  });

  describe('when typing more than two chars', () => {
    it('displays the pagination', async () => {
      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('calls the correct callback when clicking a suggestion', async () => {
      render(renderWithTheme(<Search {...props} />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdmig');

      let loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      await userEvent.click(
        screen.getByRole('button', {
          name: /jdmiguel/i,
        }),
      );

      loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

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

  it('displays the next matched suggestions when next pagination item is clicked', async () => {
    render(renderWithTheme(<Search {...props} />));

    const input = screen.getByPlaceholderText('Type user name...');
    await userEvent.type(input, 'jdm');

    let loader = await screen.findByRole('progressbar');
    await waitForElementToBeRemoved(loader);

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Go to page 2',
      }),
    );

    loader = await screen.findByRole('progressbar');
    await waitForElementToBeRemoved(loader);

    const suggestions = screen.getByTestId('suggestions');
    expect(suggestions.children.length).toBe(6);
    expect(screen.getByText('jdmut')).toBeInTheDocument();
    expect(screen.getByText('jdmqaa')).toBeInTheDocument();
    expect(screen.getByText('jdmnm')).toBeInTheDocument();
    expect(screen.getByText('jdmstr')).toBeInTheDocument();
    expect(screen.getByText('jdmld')).toBeInTheDocument();
    expect(screen.getByText('jdmx')).toBeInTheDocument();
  });
});
