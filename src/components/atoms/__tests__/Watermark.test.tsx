import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithTheme } from '../../../utils/theme';
import Watermark from '../Watermark';

describe('<Watermark />', () => {
  it('renders the content properly', () => {
    const { container } = render(renderWithTheme(<Watermark />));
    expect(container).toMatchSnapshot();
  });
});
