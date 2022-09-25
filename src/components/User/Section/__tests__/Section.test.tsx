import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Section from '..';

describe('<Section />', () => {
  const props = {
    userLogin: 'jdmiguel',
    onRequestError: vi.fn(),
  };

  describe('when section type is repos', () => {
    it('displays the correct content after loading', async () => {
      render(<Section {...props} sectionType="repos" totalItems={3} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      await waitForElementToBeRemoved(screen.getByRole('progressbar'));

      expect(screen.queryByText(/no repos added/i)).not.toBeInTheDocument();
      expect(screen.getByText('Hello world')).toBeInTheDocument();
      expect(screen.getByText('To do app')).toBeInTheDocument();
      expect(screen.getByText('Calender')).toBeInTheDocument();
    });
  });

  describe('when section type is following', () => {
    it('displays the correct content after loading', async () => {
      render(<Section {...props} sectionType="following" totalItems={5} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      await waitForElementToBeRemoved(screen.getByRole('progressbar'));

      expect(screen.queryByText(/no following added/i)).not.toBeInTheDocument();
      expect(screen.getByText('phiLands')).toBeInTheDocument();
      expect(screen.getByText('rani234')).toBeInTheDocument();
      expect(screen.getByText('linu')).toBeInTheDocument();
      expect(screen.getByText('pani34')).toBeInTheDocument();
      expect(screen.getByText('alb009')).toBeInTheDocument();
    });
  });

  describe('when section type is followers', () => {
    it('displays the correct content after loading', async () => {
      render(<Section {...props} sectionType="followers" totalItems={8} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      await waitForElementToBeRemoved(screen.getByRole('progressbar'));

      expect(screen.queryByText(/no followers added/i)).not.toBeInTheDocument();
      expect(screen.getByText('shara89')).toBeInTheDocument();
      expect(screen.getByText('malvinetto')).toBeInTheDocument();
      expect(screen.getByText('vini23')).toBeInTheDocument();
      expect(screen.getByText('nina45')).toBeInTheDocument();
      expect(screen.getByText('liniam31')).toBeInTheDocument();
      expect(screen.getByText('trocPoe')).toBeInTheDocument();
      expect(screen.getByText('karl52')).toBeInTheDocument();
      expect(screen.getByText('finn142')).toBeInTheDocument();
    });
  });
});
