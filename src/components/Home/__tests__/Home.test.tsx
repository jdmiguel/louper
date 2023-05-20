import { render } from '@testing-library/react';
import { renderWithTheme } from '../../../utils/theme';
import Home from '..';

describe('<Home />', () => {
  it('displays the content properly', () => {
    const { container } = render(renderWithTheme(<Home />));

    expect(container).toMatchSnapshot();
  });
});
