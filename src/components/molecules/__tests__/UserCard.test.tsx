import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCard from '../UserCard';

describe('<UserCard />', () => {
  const repoData = {
    id: 1,
    name: 'Hello world',
    description: 'First repo with classic hello world',
    html_url: 'https://github.com/JohnDoe/hello_world',
    topics: ['html', 'css', 'javascript'],
  };

  const userData = {
    id: 1,
    login: 'Jane Doe',
    html_url: 'https://github.com/JaneDoe',
    avatar_url: 'https://github.com/JaneDoe.jpg',
  };

  describe('when the theme is repos', () => {
    it('displays the repo content', () => {
      render(<UserCard theme="repos" data={repoData} />);

      const repoContent = screen.getByTestId('repoContent');
      expect(repoContent).toBeVisible();
    });

    it('displays a default description when no description', () => {
      render(<UserCard theme="repos" data={{ ...repoData, description: null }} />);

      const defaultDescription = screen.getByText('No description added');
      expect(defaultDescription).toBeVisible();
    });

    it('displays a default topic when no topic', () => {
      render(<UserCard theme="repos" data={{ ...repoData, topics: [] }} />);

      const defaultTopic = screen.getByText(/No topics/i);
      expect(defaultTopic).toBeVisible();
    });
  });

  describe('when the theme is following', () => {
    it('displays the user content', () => {
      render(<UserCard theme="following" data={userData} />);

      const userContent = screen.getByTestId('userContent');
      expect(userContent).toBeVisible();
    });

    it('displays the visibility icon', () => {
      render(<UserCard theme="following" data={userData} />);

      const visibilityIcon = screen.getByText('visibility');
      expect(visibilityIcon).toBeVisible();
    });
  });

  describe('when the theme is followers', () => {
    it('displays the user content', () => {
      render(<UserCard theme="followers" data={userData} />);

      const userContent = screen.getByTestId('userContent');
      expect(userContent).toBeVisible();
    });

    it('displays the favorite icon', () => {
      render(<UserCard theme="followers" data={userData} />);

      const favoriteIcon = screen.getByText('favorite');
      expect(favoriteIcon).toBeVisible();
    });
  });
});
