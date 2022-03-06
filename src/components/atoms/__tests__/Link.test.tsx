import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithTheme } from '../../../utils/theme';
import Link from '../Link';

describe('<Link />', () => {
  const props = {
    url: 'https://github.com/JohnDoe',
    ariaLabel: 'View John Doe profile on GitHub',
    content: 'VISIT PROFILE',
  };

  it('renders the content properly', () => {
    const { container } = render(renderWithTheme(<Link {...props} />));
    expect(container).toMatchSnapshot();
  });

  it('renders the content properly when there is an icon associated', () => {
    const { container } = render(
      renderWithTheme(<Link {...props} withIcon iconType="visibility" />),
    );
    expect(container).toMatchSnapshot();
  });
});
