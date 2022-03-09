import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithTheme } from '../../../utils/theme';
import Footer from '../Footer';

describe('<Footer />', () => {
  it('displays the content properly', () => {
    const { container } = render(renderWithTheme(<Footer />));

    expect(container).toMatchSnapshot();
  });
});
