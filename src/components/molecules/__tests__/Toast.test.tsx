import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Toast from '../Toast';

describe('<Toast />', () => {
  const props = {
    isOpen: true,
    msg: 'Please, choose an available user',
    onClose: jest.fn(),
  };

  it('renders the message properly', () => {
    render(<Toast {...props} />);
    expect(screen.getByText('Please, choose an available user')).toBeInTheDocument();
  });

  it('calls the correct callback when closing', async () => {
    render(<Toast {...props} />);

    await userEvent.click(screen.getByRole('button'));
    expect(props.onClose).toHaveBeenCalled();
  });
});
