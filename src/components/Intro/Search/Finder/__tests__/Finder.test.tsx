import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Finder from '..';

describe('<Finder />', () => {
  const props = {
    searchQuery: '',
    isLoadingUser: false,
    isLoadingUsers: false,
    isOnFetchingUserError: false,
    onChangeSearchQuery: jest.fn(),
    onFetchUser: jest.fn(),
  };

  it('displays a loader within the input while loading users', () => {
    render(<Finder {...props} isLoadingUsers />);

    const inputWrapper = screen.getByPlaceholderText('Type user name...').parentElement;
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
    await userEvent.type(input, 'jdmiguel');

    expect(props.onChangeSearchQuery).toHaveBeenCalled();
  });

  describe('when there is no searchQuery', () => {
    it('sets the invalid styles when clicking the search button', async () => {
      render(<Finder {...props} />);

      const searchButton = screen.getByRole('button');
      await userEvent.click(searchButton);

      const inputWrapper = screen.getByPlaceholderText('Type user name...').parentElement;
      expect(inputWrapper).toHaveClass('Mui-error');
    });
  });

  describe('when there is a searchQuery', () => {
    it('displays the search query as input value', () => {
      render(<Finder {...props} searchQuery="jdmiguel" />);

      expect(screen.getByPlaceholderText('Type user name...').getAttribute('value')).toBe(
        'jdmiguel',
      );
    });

    it('calls the correct callback when clicking the search button', async () => {
      render(<Finder {...props} searchQuery="jdmiguel" />);

      const searchButton = screen.getByRole('button');
      await userEvent.click(searchButton);

      expect(props.onFetchUser).toHaveBeenCalledWith('jdmiguel');
    });

    it('calls the correct callback when the enter key is pressed', async () => {
      render(<Finder {...props} searchQuery="jdmiguel" />);

      await userEvent.keyboard('{Enter}');

      expect(props.onFetchUser).toHaveBeenCalledWith('jdmiguel');
    });
  });
});
