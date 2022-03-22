import { render } from '@testing-library/react';
import { renderWithTheme } from '../../../../utils/theme';
import Corner from '..';

describe('<Corner />', () => {
  it('displays the content properly', () => {
    const { container } = render(renderWithTheme(<Corner />));

    expect(container).toMatchSnapshot();
  });
});
