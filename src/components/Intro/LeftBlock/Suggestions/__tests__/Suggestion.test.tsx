import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Suggestion from '../../Suggestion';

describe('<Suggestion />', () => {
  const props = {
    data: {
      id: 1,
      login: 'jdoe',
      html_url: 'https://github.com/JohnDoe',
      avatar_url: 'https://github.com/JohnDoe.jpg',
    },
    onClick: jest.fn(),
  };

  it('displays the content properly', () => {
    render(<Suggestion {...props} />);

    expect(screen.getByText('jdoe')).toBeInTheDocument();

    const userAvatar = screen.getByAltText('user avatar');
    expect(userAvatar.getAttribute('src')).toBe('https://github.com/JohnDoe.jpg');
  });

  it('calls the correct callback when clicking', async () => {
    render(<Suggestion {...props} />);

    await userEvent.click(screen.getByRole('button'));

    expect(props.onClick).toHaveBeenCalledWith('jdoe');
  });
});
