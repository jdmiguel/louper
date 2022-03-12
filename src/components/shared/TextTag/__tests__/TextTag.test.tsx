import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithTheme } from '../../../../utils/theme';
import TextTag from '../TextTag';

describe('<TextTag />', () => {
  const props = {
    content: 'madrid',
  };

  it('displays the content properly', () => {
    render(<TextTag {...props} />);

    expect(screen.getByText('madrid')).toBeInTheDocument();
  });

  it('displays the truncated text styles', () => {
    render(<TextTag {...props} />);

    const content = screen.getByText('madrid');
    expect(content).toHaveStyle('max-width: 350px');
    expect(content).toHaveStyle('overflow: hidden');
    expect(content).toHaveStyle('text-overflow: ellipsis');
    expect(content).toHaveStyle('white-space: nowrap');
  });

  it('displays the content properly with upper case', () => {
    render(renderWithTheme(<TextTag {...props} />));

    const content = screen.getByText('madrid');
    expect(content).toHaveStyle('text-transform: uppercase');
  });
});
