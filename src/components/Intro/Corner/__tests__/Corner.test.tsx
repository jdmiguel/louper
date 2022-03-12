import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithTheme } from '../../../../utils/theme';
import Corner from '../Corner';

describe('<Corner />', () => {
  it('displays the content properly', () => {
    const { container } = render(renderWithTheme(<Corner />));

    expect(container).toMatchSnapshot();
  });
});
