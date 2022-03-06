import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithTheme } from '../../../utils/theme';
import Logo from '../Logo';

describe('<Logo />', () => {
  it('renders the content properly', () => {
    const { container } = render(renderWithTheme(<Logo />));
    expect(container).toMatchSnapshot();
  });
});
