import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../../../utils/theme';
import Suggestions from '..';

describe('<Suggestions />', () => {
  const props = {
    items: [
      {
        id: 1,
        login: 'jdm',
        html_url: 'https://github.com/jdm',
        url: 'https://github.com/jdm',
        avatar_url: '',
        node_id: '',
        gravatar_id: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: '',
        type: '',
        site_admin: true,
        score: 1424,
      },
      {
        id: 3,
        login: 'jdmac',
        html_url: 'https://github.com/jdm2',
        url: 'https://github.com/jdm2',
        avatar_url: '',
        node_id: '',
        gravatar_id: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: '',
        type: '',
        site_admin: true,
        score: 1424,
      },
      {
        id: 5,
        login: 'jdme',
        html_url: 'https://github.com/jdme',
        url: 'https://github.com/jdme',
        avatar_url: '',
        node_id: '',
        gravatar_id: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: '',
        type: '',
        site_admin: true,
        score: 1424,
      },
      {
        id: 7,
        login: 'jdmiguel',
        html_url: 'https://github.com/jdmiguel',
        url: 'https://github.com/jdmiguel',
        avatar_url: '',
        node_id: '',
        gravatar_id: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: '',
        type: '',
        site_admin: true,
        score: 1424,
      },
    ],
    totalItems: 4,
    withPagination: false,
    onPaginate: vi.fn(),
    onClickSuggestion: vi.fn(),
  };

  it('displays the suggestions properly', () => {
    render(renderWithTheme(<Suggestions {...props} />));

    const suggestions = screen.getByRole('grid');
    expect(suggestions.children.length).toBe(4);

    expect(screen.getByText('jdm')).toBeInTheDocument();
    expect(screen.getByText('jdmac')).toBeInTheDocument();
    expect(screen.getByText('jdme')).toBeInTheDocument();
    expect(screen.getByText('jdmiguel')).toBeInTheDocument();
  });

  it('does not displays the pagination', () => {
    render(renderWithTheme(<Suggestions {...props} />));

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('displays the pagination with pagination', () => {
    render(renderWithTheme(<Suggestions {...props} withPagination />));

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('calls the correct callback when a suggestion is clicked', async () => {
    render(renderWithTheme(<Suggestions {...props} />));

    await userEvent.click(
      screen.getByRole('button', {
        name: /jdmiguel/i,
      }),
    );

    expect(props.onClickSuggestion).toHaveBeenCalledWith('jdmiguel');
  });

  it('calls the correct callback when a pagination item is clicked', async () => {
    render(renderWithTheme(<Suggestions {...props} withPagination />));

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Go to page 2',
      }),
    );

    expect(props.onPaginate).toHaveBeenCalledWith(2);
  });
});
