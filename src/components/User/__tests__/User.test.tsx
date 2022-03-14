import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../utils/theme';
import User from '..';

describe('<User />', () => {
  const props = {
    userData: {
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
    },
    onBackFinder: jest.fn(),
  };

  it('displays the correct content', () => {
    render(renderWithTheme(<User {...props} />));

    expect(screen.getByTestId('profile')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-mobile')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('user-section')).toBeInTheDocument();
  });

  it('displays the repos section as active', () => {
    render(renderWithTheme(<User {...props} />));

    const reposMenuItem = screen.getByText(/repos/i).parentElement;
    expect(reposMenuItem).toHaveClass('Mui-selected');
  });

  it('calls the correct callback when clicking the search menu item', async () => {
    render(renderWithTheme(<User {...props} />));

    await userEvent.click(
      screen.getByRole('button', {
        name: /search/i,
      }),
    );

    expect(props.onBackFinder).toHaveBeenCalled();
  });
});
