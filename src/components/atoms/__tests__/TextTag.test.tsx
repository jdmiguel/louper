import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithTheme } from '../../../utils/theme';
import TextTag from '../TextTag';

describe('<TextTag />', () => {
  const props = {
    content: 'Madrid',
  };

  it('renders the content properly', () => {
    const { container } = render(renderWithTheme(<TextTag {...props} />));
    expect(container).toMatchSnapshot();
  });

  it('renders the content properly with lower case', () => {
    const { container } = render(renderWithTheme(<TextTag {...props} withLowerCase />));
    expect(container).toMatchSnapshot();
  });

  it('renders the content properly when there is an icon associated', () => {
    const { container } = render(
      renderWithTheme(<TextTag {...props} withIcon iconType="location_on" />),
    );
    expect(container).toMatchSnapshot();
  });
});
