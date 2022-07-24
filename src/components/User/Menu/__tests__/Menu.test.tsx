import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../../utils/theme';
import Menu from '..';

describe('<Menu />', () => {
  const props = {
    onClick: jest.fn(),
  };

  it('displays the menu items', () => {
    render(renderWithTheme(<Menu {...props} />));

    // First menu item
    expect(screen.getByText(/repos/i)).toBeInTheDocument();
    expect(screen.getByTestId('FolderIcon')).toBeInTheDocument();

    // Second menu item
    expect(screen.getByText(/following/i)).toBeInTheDocument();
    expect(screen.getByTestId('VisibilityIcon')).toBeInTheDocument();

    // Third menu item
    expect(screen.getByText(/followers/i)).toBeInTheDocument();
    expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument();

    // Fourth menu item
    expect(screen.getByText(/search/i)).toBeInTheDocument();
    expect(screen.getByTestId('SearchIcon')).toBeInTheDocument();
  });

  it('calls the correct callback when clicking the menu items', async () => {
    render(renderWithTheme(<Menu {...props} />));

    // Click the second menu item
    const followingItem = screen.getByText(/following/i).parentElement;
    if (!followingItem) return;
    await userEvent.click(followingItem);

    expect(props.onClick).toHaveBeenCalledWith(1);

    // Click the third menu item
    const followersItem = screen.getByText(/followers/i).parentElement;
    if (!followersItem) return;
    await userEvent.click(followersItem);

    expect(props.onClick).toHaveBeenCalledWith(2);

    // Click the fourth menu item
    const searchItem = screen.getByText(/search/i).parentElement;
    if (!searchItem) return;
    await userEvent.click(searchItem);

    expect(props.onClick).toHaveBeenCalledWith(3);

    // Click the first menu item
    const reposItem = screen.getByText(/repos/i).parentElement;
    if (!reposItem) return;
    await userEvent.click(reposItem);

    expect(props.onClick).toHaveBeenCalledWith(0);
  });
});
