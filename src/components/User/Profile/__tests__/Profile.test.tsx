import { render } from '@testing-library/react';
import Profile from '..';

describe('<Profile />', () => {
  it('displays the content properly', () => {
    const { container } = render(<Profile />);

    expect(container).toMatchSnapshot();
  });
});
