import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithTheme } from '../../../utils/theme';
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
    const { container } = render(renderWithTheme(<Suggestion {...props} />));
    expect(container).toMatchSnapshot();
  });

  it('calls the correct callback when the enter key is pressed', async () => {
    render(<Suggestion {...props} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(props.onClick).toHaveBeenCalledWith('John Doe');
  });
});
