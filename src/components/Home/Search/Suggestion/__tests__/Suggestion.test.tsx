import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Suggestion from '..';

describe('<Suggestion />', () => {
  const props = {
    data: {
      id: 7,
      login: 'jdmiguel',
      html_url: 'https://github.com/jdmiguel',
      avatar_url: 'https://github.com/jdmiguel.jpg',
    },
    onClick: vi.fn(),
  };

  it('displays the content properly', () => {
    render(<Suggestion {...props} />);

    expect(screen.getByText('jdmiguel')).toBeInTheDocument();

    const userAvatar = screen.getByAltText('user avatar');
    expect(userAvatar.getAttribute('src')).toBe('https://github.com/jdmiguel.jpg');
  });

  it('calls the correct callback when clicking', async () => {
    render(<Suggestion {...props} />);

    await userEvent.click(screen.getByRole('button'));

    expect(props.onClick).toHaveBeenCalledWith('jdmiguel');
  });
});
