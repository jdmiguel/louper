import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../../../utils/theme';
import Suggestions from '..';

describe('<Suggestions />', () => {
  const props = {
    items: [
      {
        id: 1,
        login: 'jdm',
        html_url: 'https://github.com/jdm',
        avatar_url: '',
      },
      {
        id: 3,
        login: 'jdm12',
        html_url: 'https://github.com/jdm2',
        avatar_url: '',
      },
      {
        id: 5,
        login: 'jdm34',
        html_url: 'https://github.com/jdm34',
        avatar_url: '',
      },
      {
        id: 7,
        login: 'jdmiguel',
        html_url: 'https://github.com/jdmiguel',
        avatar_url: '',
      },
    ],
    totalItems: 4,
    withPagination: false,
    onPaginate: jest.fn(),
    onSelectUser: jest.fn(),
  };

  it('displays the suggestions properly', () => {
    render(<Suggestions {...props} />);

    const suggestions = screen.getByTestId('suggestions');
    expect(suggestions.children.length).toBe(3);

    expect(screen.getByText('jdm')).toBeInTheDocument();
    expect(screen.getByText('jdm1')).toBeInTheDocument();
    expect(screen.getByText('jdm12')).toBeInTheDocument();
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
        name: /jdmiguel/i,
      }),
    );

    expect(props.onSelectUser).toHaveBeenCalledWith('jdmiguel');
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
