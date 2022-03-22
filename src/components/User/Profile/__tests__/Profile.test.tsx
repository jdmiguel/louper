import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '..';

describe('<Profile />', () => {
  const props = {
    userData: {
      login: 'jdmiguel',
      html_url: 'https://github.com/jdmiguel',
      avatar_url: 'https://github.com/jdmiguel.jpg',
      created_at: '2014-03-20T20:24:22Z',
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

  it('displays the correct avatar', () => {
    render(<Profile {...props} />);

    const userAvatar = screen.getByAltText('user avatar');
    expect(userAvatar.getAttribute('src')).toBe('https://github.com/jdmiguel.jpg');
  });

  it('displays the correct main data', () => {
    render(<Profile {...props} />);

    const mainInfo = screen.getByText('jdmiguel').parentElement;
    expect(mainInfo.children).toHaveLength(3);

    expect(screen.getByText('Jaime De Miguel')).toBeInTheDocument();
    expect(screen.getByText('Frontend developer')).toBeInTheDocument();
  });

  it('does not display the name field when no name', () => {
    render(<Profile {...props} userData={{ ...props.userData, name: null }} />);

    const mainInfo = screen.getByText('jdmiguel').parentElement;
    expect(mainInfo.children).toHaveLength(2);

    expect(screen.queryByText('Jaime De Miguel')).not.toBeInTheDocument();
  });

  it('does not display the bio field when no bio', () => {
    render(<Profile {...props} userData={{ ...props.userData, bio: null }} />);

    const mainInfo = screen.getByText('jdmiguel').parentElement;
    expect(mainInfo.children).toHaveLength(2);

    expect(screen.queryByText('Frontend developer')).not.toBeInTheDocument();
  });

  it('renders the correct info details', () => {
    render(<Profile {...props} />);

    const details = screen.getByText('jdmiguel').parentElement.nextElementSibling;
    expect(details.children).toHaveLength(6);

    // repos
    expect(screen.getByText(30)).toBeInTheDocument();
    expect(screen.getByText('folder')).toBeInTheDocument();

    // following
    expect(screen.getByText(16)).toBeInTheDocument();
    expect(screen.getByText('visibility')).toBeInTheDocument();

    // followers
    expect(screen.getByText(12)).toBeInTheDocument();
    expect(screen.getByText('favorite')).toBeInTheDocument();

    // created_at
    expect(screen.getByText('3/20/2014')).toBeInTheDocument();
    expect(screen.getByText('event_note')).toBeInTheDocument();

    // location
    expect(screen.getByText('Dublin')).toBeInTheDocument();
    expect(screen.getByText('location_on')).toBeInTheDocument();

    // company
    expect(screen.getByText('Kitman Labs')).toBeInTheDocument();
    expect(screen.getByText('business')).toBeInTheDocument();
  });

  it('does not display the location field when no location', () => {
    render(<Profile {...props} userData={{ ...props.userData, location: null }} />);

    const details = screen.getByText('jdmiguel').parentElement.nextElementSibling;
    expect(details.children).toHaveLength(5);

    expect(screen.queryByText('Dublin')).not.toBeInTheDocument();
    expect(screen.queryByText('location_on')).not.toBeInTheDocument();
  });

  it('does not display the company field when no location', () => {
    render(<Profile {...props} userData={{ ...props.userData, company: null }} />);

    const details = screen.getByText('jdmiguel').parentElement.nextElementSibling;
    expect(details.children).toHaveLength(5);

    expect(screen.queryByText('Kitman Labs')).not.toBeInTheDocument();
    expect(screen.queryByText('business')).not.toBeInTheDocument();
  });

  it('displays the correct actions', () => {
    render(<Profile {...props} />);

    // profile action
    const profileLink = screen.getByText(/visit profile/i);
    expect(profileLink.getAttribute('href')).toBe('https://github.com/jdmiguel');
    expect(profileLink.getAttribute('aria-label')).toBe('View jdmiguel profile on GitHub');

    // email action
    const emailLink = screen.getByText(/send email/i);
    expect(emailLink.getAttribute('href')).toBe('mailto:jdmiguel@gmail.com');
    expect(emailLink.getAttribute('aria-label')).toBe('Send email to jdmiguel');
    expect(screen.getByText('mail_outline')).toBeInTheDocument();

    // blog action
    const blogLink = screen.getByText(/visit portfolio/i);
    expect(blogLink.getAttribute('href')).toBe('https://jdmiguel.netlify.app/');
    expect(blogLink.getAttribute('aria-label')).toBe('View portfolio of jdmiguel');
    expect(screen.getByText('web_icon')).toBeInTheDocument();
  });

  it('does not display the email action when no email', () => {
    render(<Profile {...props} userData={{ ...props.userData, email: null }} />);

    expect(screen.queryByText(/send email/i)).not.toBeInTheDocument();
    expect(screen.queryByText('mail_outline')).not.toBeInTheDocument();
  });

  it('does not display the blog action when no blog', () => {
    render(<Profile {...props} userData={{ ...props.userData, blog: null }} />);

    expect(screen.queryByText(/visit portfolio/i)).not.toBeInTheDocument();
    expect(screen.queryByText('web_icon')).not.toBeInTheDocument();
  });
});
