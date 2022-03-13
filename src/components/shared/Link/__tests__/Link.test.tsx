import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Link from '..';

describe('<Link />', () => {
  const props = {
    url: 'https://github.com/JohnDoe',
    ariaLabel: 'View John Doe profile on GitHub',
    content: 'VISIT PROFILE',
  };

  it('displays the correct data', () => {
    render(<Link {...props} />);

    const link = screen.getByText('VISIT PROFILE');
    expect(link.getAttribute('href')).toBe('https://github.com/JohnDoe');
    expect(link.getAttribute('aria-label')).toBe('View John Doe profile on GitHub');
  });

  it('displays the selected icon', () => {
    render(<Link {...props} withIcon iconType="person" />);

    expect(screen.getByText('person')).toBeInTheDocument();
  });
});
