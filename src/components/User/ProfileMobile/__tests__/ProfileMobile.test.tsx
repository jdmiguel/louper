import { render, screen } from '@testing-library/react';
import ProfileMobile from '..';

describe('<ProfileMobile />', () => {
  const props = {
    userData: {
      login: 'jdmiguel',
      html_url: 'https://github.com/jdmiguel',
      avatar_url: 'https://github.com/jdmiguel.jpg',
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
  };

  it('displays the correct data', () => {
    render(<ProfileMobile {...props} />);

    const userAvatar = screen.getByAltText('user avatar');
    expect(userAvatar.getAttribute('src')).toBe('https://github.com/jdmiguel.jpg');

    expect(screen.getByText('Jaime De Miguel')).toBeInTheDocument();
    expect(screen.getByText('jdmiguel')).toBeInTheDocument();
  });

  it('does not display the name field when no name', () => {
    render(<ProfileMobile {...props} userData={{ ...props.userData, name: '' }} />);

    expect(screen.queryByText('Jaime De Miguel')).not.toBeInTheDocument();
  });
});
