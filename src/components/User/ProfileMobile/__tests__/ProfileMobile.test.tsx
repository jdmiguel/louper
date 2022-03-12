import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileMobile from '..';

describe('<ProfileMobile />', () => {
  const props = {
    userData: {
      login: 'jdoe',
      html_url: 'https://github.com/JohnDoe',
      avatar_url: 'https://github.com/JohnDoe.jpg',
      created_at: '',
      name: 'John Doe',
      bio: '',
      email: '',
      location: '',
      blog: '',
      company: '',
      public_repos: 0,
      followers: 0,
      following: 0,
    },
  };

  it('displays the correct data', () => {
    render(<ProfileMobile {...props} />);

    const userAvatar = screen.getByAltText('user avatar');
    expect(userAvatar.getAttribute('src')).toBe('https://github.com/JohnDoe.jpg');

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jdoe')).toBeInTheDocument();
  });

  it('does not display the name field when no name', () => {
    render(<ProfileMobile {...props} userData={{ ...props.userData, name: null }} />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });
});
