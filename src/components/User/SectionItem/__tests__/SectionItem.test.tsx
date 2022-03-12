import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SectionItem from '..';

describe('<SectionItem />', () => {
  const repoData = {
    id: 1,
    name: 'Hello world',
    description: 'First repo with classic hello world',
    html_url: 'https://github.com/JohnDoe/hello_world',
    topics: ['javascript'],
  };

  const followingData = {
    id: 1,
    login: 'janeD12',
    html_url: 'https://github.com/JaneDoe',
    avatar_url: 'https://github.com/JaneDoe.jpg',
  };

  const followerData = {
    id: 2,
    login: 'peMac',
    html_url: 'https://github.com/PeterMacbeth',
    avatar_url: 'https://github.com/PeterMacbeth.jpg',
  };

  describe('when the theme is repos', () => {
    it('displays the repos theme', () => {
      render(<SectionItem theme="repos" data={repoData} />);

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
      render(<SectionItem theme="repos" data={{ ...repoData, description: null }} />);

      const defaultDescription = screen.getByText('No description added');
      expect(defaultDescription).toBeInTheDocument();
    });

    it('displays a default topic when no topic', () => {
      render(<SectionItem theme="repos" data={{ ...repoData, topics: [] }} />);

      expect(screen.getByText(/No topics/i)).toBeInTheDocument();
    });
  });

  describe('when the theme is following', () => {
    it('displays the following theme', () => {
      render(<SectionItem theme="following" data={followingData} />);
      expect(screen.getByTestId('userContent')).toBeInTheDocument();
      expect(screen.queryByTestId('repoContent')).not.toBeInTheDocument();

      expect(screen.getByText('janeD12')).toBeInTheDocument();

      const userAvatar = screen.getByAltText('user following avatar');
      expect(userAvatar.getAttribute('src')).toBe('https://github.com/JaneDoe.jpg');

      const userLink = screen.getByText(/Visit profile/i);
      expect(userLink.getAttribute('aria-label')).toBe('View janeD12 profile on GitHub');
      expect(userLink.getAttribute('href')).toBe('https://github.com/JaneDoe');
    });

    it('displays the visibility icon', () => {
      render(<SectionItem theme="following" data={followingData} />);

      expect(screen.getByText('visibility')).toBeInTheDocument();
    });
  });

  describe('when the theme is followers', () => {
    it('displays the user followers theme', () => {
      render(<SectionItem theme="followers" data={followerData} />);
      expect(screen.getByTestId('userContent')).toBeInTheDocument();
      expect(screen.queryByTestId('repoContent')).not.toBeInTheDocument();

      expect(screen.getByText('peMac')).toBeInTheDocument();

      const userAvatar = screen.getByAltText('user followers avatar');
      expect(userAvatar.getAttribute('src')).toBe('https://github.com/PeterMacbeth.jpg');

      const userLink = screen.getByText(/Visit profile/i);
      expect(userLink.getAttribute('aria-label')).toBe('View peMac profile on GitHub');
      expect(userLink.getAttribute('href')).toBe('https://github.com/PeterMacbeth');
    });

    it('displays the favorite icon', () => {
      render(<SectionItem theme="followers" data={followerData} />);

      expect(screen.getByText('favorite')).toBeInTheDocument();
    });
  });
});
