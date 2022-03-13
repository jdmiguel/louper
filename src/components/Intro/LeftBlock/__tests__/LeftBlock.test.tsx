import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../../utils/theme';
import LeftBlock from '..';

describe('<LeftBlock />', () => {
  const props = {
    onFetchUser: jest.fn(),
    onRequestError: jest.fn(),
  };

  it('displays the correct content', () => {
    render(renderWithTheme(<LeftBlock {...props} />));

    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('displays the pagination when typing more than two chars', async () => {
    render(renderWithTheme(<LeftBlock {...props} />));

    // INTERCEPT REQUEST

    const input = screen.getByPlaceholderText('Type user name...');
    userEvent.type(input, 'jdm');

    // const loader = await screen.findByRole('progressbar');
    // await waitForElementToBeRemoved(loader);

    await expect(screen.findByRole('navigation')).toBeInTheDocument();
  });
});
