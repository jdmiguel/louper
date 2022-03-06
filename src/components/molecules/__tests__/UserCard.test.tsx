import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCard from '../UserCard';

describe('<UserCard />', () => {
  const repoData = {
    id: 1,
    name: 'Hello world',
    description: 'First repo with classic hello world',
    html_url: 'https://github.com/JohnDoe/hello_world',
    topics: ['javascript'],
  };

  const followingData = {
    id: 1,
    login: 'Jane Doe',
    html_url: 'https://github.com/JaneDoe',
    avatar_url: 'https://github.com/JaneDoe.jpg',
  };

  const followerData = {
    id: 2,
    login: 'Peter Macbeth',
    html_url: 'https://github.com/PeterMacbeth',
    avatar_url: 'https://github.com/PeterMacbeth.jpg',
  };

  describe('when the theme is repos', () => {
    it('displays the repo content', () => {
      render(<UserCard theme="repos" data={repoData} />);

      expect(screen.getByTestId('repoContent')).toBeInTheDocument();
      expect(screen.queryByTestId('userContent')).not.toBeInTheDocument();

      expect(screen.getByText('Hello world')).toBeInTheDocument();
      expect(screen.getByText('First repo with classic hello world')).toBeInTheDocument();
      expect(screen.getByText('javascript')).toBeInTheDocument();

      const repoLink = screen.getByText(/Visit repo/i);
      expect(repoLink.getAttribute('aria-label')).toBe('View Hello world repository on GitHub');
      expect(repoLink.getAttribute('href')).toBe('https://github.com/JohnDoe/hello_world');
    });

    it('displays a default description when no description', () => {
      render(<UserCard theme="repos" data={{ ...repoData, description: null }} />);

      const defaultDescription = screen.getByText('No description added');
      expect(defaultDescription).toBeInTheDocument();
    });

    it('displays a default topic when no topic', () => {
      render(<UserCard theme="repos" data={{ ...repoData, topics: [] }} />);
      expect(screen.getByText(/No topics/i)).toBeInTheDocument();
    });
  });

  describe('when the theme is following', () => {
    it('displays the user content', () => {
      render(<UserCard theme="following" data={followingData} />);
      expect(screen.getByTestId('userContent')).toBeInTheDocument();
      expect(screen.queryByTestId('repoContent')).not.toBeInTheDocument();

      expect(screen.getByText('Jane Doe')).toBeInTheDocument();

      const userAvatar = screen.getByAltText('user following avatar');
      expect(userAvatar.getAttribute('src')).toBe('https://github.com/JaneDoe.jpg');

      const userLink = screen.getByText(/Visit profile/i);
      expect(userLink.getAttribute('aria-label')).toBe('View Jane Doe profile on GitHub');
      expect(userLink.getAttribute('href')).toBe('https://github.com/JaneDoe');
    });

    it('displays the visibility icon', () => {
      render(<UserCard theme="following" data={followingData} />);
      expect(screen.getByText('visibility')).toBeInTheDocument();
    });
  });

  describe('when the theme is followers', () => {
    it('displays the user content', () => {
      render(<UserCard theme="followers" data={followerData} />);
      expect(screen.getByTestId('userContent')).toBeInTheDocument();
      expect(screen.queryByTestId('repoContent')).not.toBeInTheDocument();

      expect(screen.getByText('Peter Macbeth')).toBeInTheDocument();

      const userAvatar = screen.getByAltText('user followers avatar');
      expect(userAvatar.getAttribute('src')).toBe('https://github.com/PeterMacbeth.jpg');

      const userLink = screen.getByText(/Visit profile/i);
      expect(userLink.getAttribute('aria-label')).toBe('View Peter Macbeth profile on GitHub');
      expect(userLink.getAttribute('href')).toBe('https://github.com/PeterMacbeth');
    });

    it('displays the favorite icon', () => {
      render(<UserCard theme="followers" data={followerData} />);
      expect(screen.getByText('favorite')).toBeInTheDocument();
    });
  });
});
