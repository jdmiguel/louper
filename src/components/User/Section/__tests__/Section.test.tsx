import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { UserItems } from '@/utils/types';
import '@/mocks/intersectionObserverMock';
import Section from '..';

describe('<Section />', () => {
  const repoItems = [
    {
      id: 1,
      name: 'Hello world',
      description: 'First repo with classic hello world',
      html_url: 'https://github.com/jdmiguel/hello_world',
      topics: ['javascript'],
    },
  ];
  const followingItems = [
    {
      id: 1,
      login: 'phiLands',
      html_url: 'https://github.com/phiLands',
      avatar_url: 'https://github.com/phiLands.jpg',
    },
  ];
  const followerItems = [
    {
      id: 1,
      login: 'shara89',
      html_url: 'https://github.com/shara89',
      avatar_url: 'https://github.com/shara89.jpg',
    },
  ];

  const props = {
    isLoading: false,
    areAllItemsLoaded: false,
    onNextPage: vi.fn(),
  };

  describe('when items type is repos', () => {
    it('displays the correct content', () => {
      render(<Section {...props} itemsType="repos" items={repoItems as UserItems} />);

      expect(screen.queryByText(/no repos added/i)).not.toBeInTheDocument();
      expect(screen.getByText('Hello world')).toBeInTheDocument();
      expect(screen.getByText('First repo with classic hello world')).toBeInTheDocument();
    });

    it('displays the no items message', () => {
      render(<Section {...props} itemsType="repos" items={[]} />);

      expect(screen.getByText(/no repos added/i)).toBeInTheDocument();
    });
  });

  describe('when items type is following', () => {
    it('displays the correct content', () => {
      render(<Section {...props} itemsType="following" items={followingItems as UserItems} />);

      expect(screen.queryByText(/no following added/i)).not.toBeInTheDocument();
      expect(screen.getByText('phiLands')).toBeInTheDocument();
    });
  });

  describe('when items type is followers', () => {
    it('displays the correct content', () => {
      render(<Section {...props} itemsType="followers" items={followerItems as UserItems} />);

      expect(screen.queryByText(/no followers added/i)).not.toBeInTheDocument();
      expect(screen.getByText('shara89')).toBeInTheDocument();
    });
  });
});
