import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../utils/theme';
import User from '..';

describe('<User />', () => {
  const props = {
    userData: {
      login: 'jdoe',
      html_url: 'https://github.com/JohnDoe',
      avatar_url: 'https://github.com/JohnDoe.jpg',
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
    },
    onBackFinder: jest.fn(),
  };

  it('displays the correct content', () => {
    render(renderWithTheme(<User {...props} />));

    expect(screen.queryByTestId('userProfile'));
    expect(screen.queryByTestId('userProfileMobile')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays the repos section as active', () => {
    render(renderWithTheme(<User {...props} />));

    const reposMenuItem = screen.getByText(/repos/i).parentElement;
    expect(reposMenuItem).toHaveClass('Mui-selected');
  });

  it('calls the correct callback when clicking the search menu item', async () => {
    render(renderWithTheme(<User {...props} />));

    await userEvent.click(screen.getByText(/search/i).parentElement);

    expect(props.onBackFinder).toHaveBeenCalled();
  });
});
