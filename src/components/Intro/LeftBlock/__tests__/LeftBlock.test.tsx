import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
});
