import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
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
    const { getByPlaceholderText } = render(<Finder {...props} isLoadingUsers />);

    const inputWrapper = getByPlaceholderText('Type user name...').parentNode;
    const circularLoader = inputWrapper.querySelector('.MuiCircularProgress-root');
    expect(circularLoader).toBeVisible();
  });

  it('displays a loader within the search button while loading a user', () => {
    const { getByRole } = render(<Finder {...props} isLoadingUser />);

    const searchButton = getByRole('button');
    const circularLoader = searchButton.querySelector('.MuiCircularProgress-root');
    expect(circularLoader).toBeVisible();
  });
});
