import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Finder from '../Finder';

describe('<Finder />', () => {
  const props = {
    searchQuery: '',
    isLoadingUser: false,
    isLoadingUsers: false,
    onChangeSearchQuery: jest.fn(),
    onFetchUser: jest.fn(),
  };

  it('displays a loader within the input while loading users', () => {
    render(<Finder {...props} isLoadingUsers />);

    const inputWrapper = screen.getByPlaceholderText('Type user name...').parentNode;
    const circularLoader = inputWrapper.querySelector('.MuiCircularProgress-root');
    expect(circularLoader).toBeVisible();
  });

  it('displays a loader within the search button while loading a user', () => {
    render(<Finder {...props} isLoadingUser />);

    const searchButton = screen.getByRole('button');
    const circularLoader = searchButton.querySelector('.MuiCircularProgress-root');
    expect(circularLoader).toBeVisible();
  });

  it('calls the correct callback when typing more than two chars', async () => {
    render(<Finder {...props} />);

    const input = screen.getByPlaceholderText('Type user name...');
    await userEvent.type(input, 'Dan');

    expect(props.onChangeSearchQuery).toHaveBeenCalled();
  });

  describe('when there is a searchQuery', () => {
    it('calls the correct callback when clicking the search button', async () => {
      render(<Finder {...props} searchQuery="Dan" />);

      const searchButton = screen.getByRole('button');
      await userEvent.click(searchButton);

      expect(props.onFetchUser).toHaveBeenCalledWith('Dan');
    });

    it('calls the correct callback when the enter key is pressed', async () => {
      render(<Finder {...props} searchQuery="Dan" />);

      await userEvent.keyboard('{Enter}');

      expect(props.onFetchUser).toHaveBeenCalledWith('Dan');
    });
  });
});
