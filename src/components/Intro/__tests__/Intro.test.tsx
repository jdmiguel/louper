import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../utils/theme';
import Intro from '..';

describe('<Intro />', () => {
  const props = {
    onFetchUser: jest.fn(),
  };

  it('displays the correct content', () => {
    render(renderWithTheme(<Intro {...props} />));

    expect(screen.getByTestId('header-intro')).toBeInTheDocument();
    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('globe')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('does not display the globe and the footer with small devices', () => {
    window.resizeTo(375, 667);

    render(renderWithTheme(<Intro {...props} />));

    expect(screen.queryByTestId('globe')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });

  it('calls the correct callback when fetching a user', async () => {
    render(renderWithTheme(<Intro {...props} />));

    const input = screen.getByPlaceholderText('Type user name...');
    await userEvent.type(input, 'jdm');

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
