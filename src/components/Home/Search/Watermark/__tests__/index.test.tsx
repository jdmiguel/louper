import { render } from '@testing-library/react';
import { renderWithTheme } from '../../../../../utils/theme';
import Watermark from '..';

describe('<Watermark />', () => {
  it('displays the content properly', () => {
    const { container } = render(renderWithTheme(<Watermark />));

    expect(container).toMatchSnapshot();
  });
});
