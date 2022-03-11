import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../Profile';

describe('<Profile />', () => {
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
  };

  it('displays the correct avatar', () => {
    render(<Profile {...props} />);

    const userAvatar = screen.getByAltText('user avatar');
    expect(userAvatar.getAttribute('src')).toBe('https://github.com/JohnDoe.jpg');
  });

  it('displays the correct main data', () => {
    render(<Profile {...props} />);

    const mainInfo = screen.getByText('jdoe').parentElement;
    expect(mainInfo.children).toHaveLength(3);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Frontend developer')).toBeInTheDocument();
  });

  it('does not display the name field when no name', () => {
    render(<Profile {...props} userData={{ ...props.userData, name: null }} />);

    const mainInfo = screen.getByText('jdoe').parentElement;
    expect(mainInfo.children).toHaveLength(2);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('does not display the bio field when no bio', () => {
    render(<Profile {...props} userData={{ ...props.userData, bio: null }} />);

    const mainInfo = screen.getByText('jdoe').parentElement;
    expect(mainInfo.children).toHaveLength(2);

    expect(screen.queryByText('Frontend developer')).not.toBeInTheDocument();
  });

  it('renders the correct info details', () => {
    render(<Profile {...props} />);

    const details = screen.getByText('jdoe').parentElement.nextElementSibling;
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
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('business')).toBeInTheDocument();
  });

  it('does not display the location field when no location', () => {
    render(<Profile {...props} userData={{ ...props.userData, location: null }} />);

    const details = screen.getByText('jdoe').parentElement.nextElementSibling;
    expect(details.children).toHaveLength(5);

    expect(screen.queryByText('Dublin')).not.toBeInTheDocument();
    expect(screen.queryByText('location_on')).not.toBeInTheDocument();
  });

  it('does not display the company field when no location', () => {
    render(<Profile {...props} userData={{ ...props.userData, company: null }} />);

    const details = screen.getByText('jdoe').parentElement.nextElementSibling;
    expect(details.children).toHaveLength(5);

    expect(screen.queryByText('Google')).not.toBeInTheDocument();
    expect(screen.queryByText('business')).not.toBeInTheDocument();
  });

  it('displays the correct actions', () => {
    render(<Profile {...props} />);

    // profile action
    const profileLink = screen.getByText(/visit profile/i);
    expect(profileLink.getAttribute('href')).toBe('https://github.com/JohnDoe');
    expect(profileLink.getAttribute('aria-label')).toBe('View jdoe profile on GitHub');

    // email action
    const emailLink = screen.getByText(/send email/i);
    expect(emailLink.getAttribute('href')).toBe('mailto:jdoe@gmail.com');
    expect(emailLink.getAttribute('aria-label')).toBe('Send email to jdoe');
    expect(screen.getByText('mail_outline')).toBeInTheDocument();

    // blog action
    const blogLink = screen.getByText(/visit portfolio/i);
    expect(blogLink.getAttribute('href')).toBe('https://jdoe.netlify.app/');
    expect(blogLink.getAttribute('aria-label')).toBe('View portfolio of jdoe');
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
