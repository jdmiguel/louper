import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toast from '..';

describe('<Toast />', () => {
  const props = {
    isOpen: true,
    msg: 'Please, choose an available user',
    onClose: vi.fn(),
  };

  it('displays the message properly', () => {
    render(<Toast {...props} />);

    expect(screen.getByText('Please, choose an available user')).toBeInTheDocument();
  });

  it('calls the correct callback when closing', async () => {
    render(<Toast {...props} />);

    await userEvent.click(screen.getByRole('button'));

    expect(props.onClose).toHaveBeenCalled();
  });
});
