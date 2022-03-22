import { render } from '@testing-library/react';
import { renderWithTheme } from '../../../../utils/theme';
import Footer from '..';

describe('<Footer />', () => {
  it('displays the content properly', () => {
    const { container } = render(renderWithTheme(<Footer />));

    expect(container).toMatchSnapshot();
  });
});
