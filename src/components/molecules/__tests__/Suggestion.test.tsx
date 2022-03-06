import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Suggestion from '../Suggestion';

describe('<Suggestion />', () => {
  const props = {
    data: {
      id: 1,
      login: 'John Doe',
      html_url: 'https://github.com/JohnDoe',
      avatar_url: 'https://github.com/JohnDoe.jpg',
    },
    onClick: jest.fn(),
  };

  it('renders the content properly', () => {
    render(<Suggestion {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();

    const userAvatar = screen.getByAltText('user avatar');
    expect(userAvatar.getAttribute('src')).toBe('https://github.com/JohnDoe.jpg');
  });

  it('calls the correct callback when the enter key is pressed', async () => {
    render(<Suggestion {...props} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(props.onClick).toHaveBeenCalledWith('John Doe');
  });
});
