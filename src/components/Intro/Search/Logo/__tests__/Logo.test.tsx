import { render } from '@testing-library/react';
import { renderWithTheme } from '../../../../../utils/theme';
import Logo from '..';

describe('<Logo />', () => {
  it('displays the content properly', () => {
    const { container } = render(renderWithTheme(<Logo />));

    expect(container).toMatchSnapshot();
  });
});
