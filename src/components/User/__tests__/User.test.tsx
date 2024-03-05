import { render, screen } from '@testing-library/react';
import { renderWithTheme } from '../../../utils/theme';
import { renderWithUserDataMocked } from '../../../mocks/userDataMocked';
import User from '..';

describe('<User />', () => {
  it('displays the correct content', () => {
    render(renderWithTheme(renderWithUserDataMocked(<User />)));

    expect(screen.getByTestId('profile')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-mobile')).not.toBeInTheDocument();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByTestId('section')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('does not display the footer with small devices', () => {
    window.resizeTo(375, 667);

    render(renderWithTheme(renderWithUserDataMocked(<User />)));

    expect(screen.queryByTestId('footer')).not.toBeVisible();
  });

  it('displays the repos section as active', () => {
    render(renderWithTheme(renderWithUserDataMocked(<User />)));

    const reposMenuItem = screen.getByText(/repos/i).parentElement;
    expect(reposMenuItem).toHaveClass('Mui-selected');
  });
});
