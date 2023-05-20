import { render } from '@testing-library/react';
import ProfileMobile from '..';

describe('<ProfileMobile />', () => {
  it('displays the content properly', () => {
    const { container } = render(<ProfileMobile />);

    expect(container).toMatchSnapshot();
  });
});
