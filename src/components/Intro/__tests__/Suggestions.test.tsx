import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../utils/theme';
import Suggestions from '../Suggestions';

describe('<Suggestions />', () => {
  const props = {
    items: [
      {
        id: 1,
        login: 'jdoe',
        html_url: 'https://github.com/JohnDoe',
        avatar_url: 'https://github.com/JohnDoe.jpg',
      },
      {
        id: 2,
        login: 'janeD12',
        html_url: 'https://github.com/JaneDoe',
        avatar_url: 'https://github.com/JaneDoe.jpg',
      },
      {
        id: 3,
        login: 'peMac',
        html_url: 'https://github.com/PeterMacbeth',
        avatar_url: 'https://github.com/PeterMacbeth.jpg',
      },
    ],
    totalItems: 5,
    withPagination: false,
    onPaginate: jest.fn(),
    onSelectUser: jest.fn(),
  };

  it('displays the suggestions properly', () => {
    render(<Suggestions {...props} />);

    expect(screen.getByText('jdoe')).toBeInTheDocument();
    expect(screen.getByText('janeD12')).toBeInTheDocument();
    expect(screen.getByText('peMac')).toBeInTheDocument();
  });

  it('does not displays the pagination', () => {
    render(<Suggestions {...props} />);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('displays the pagination with pagination', () => {
    render(renderWithTheme(<Suggestions {...props} withPagination />));

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('calls the correct callback when a suggestion is clicked', async () => {
    render(<Suggestions {...props} />);

    await userEvent.click(
      screen.getByRole('button', {
        name: /jdoe/i,
      }),
    );

    expect(props.onSelectUser).toHaveBeenCalledWith('jdoe');
  });

  it('calls the correct callback when a pagination item is clicked', async () => {
    render(renderWithTheme(<Suggestions {...props} withPagination />));

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Go to page 2',
      }),
    );

    expect(props.onPaginate).toHaveBeenCalledWith(2);
  });
});
