import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../../utils/theme';
import Search from '..';

describe('<Search />', () => {
  it('displays the correct content', () => {
    render(renderWithTheme(<Search />));

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type user name...'));
    expect(screen.getByText('Seek and find any Github user worldwide')).toBeInTheDocument();
    expect(screen.getByTestId('watermark')).toBeInTheDocument();
  });

  describe('when typing no more than two chars', () => {
    it('displays the correct label error when clicking the search button', async () => {
      render(renderWithTheme(<Search />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jd');

      await userEvent.click(
        screen.getByRole('button', {
          name: /search/i,
        }),
      );

      const labelText = screen
        .getAllByText('Please, type three chars at least')
        .find((domElement) => domElement.tagName === 'LABEL');

      expect(labelText).toBeInTheDocument();
    });

    it('displays the correct label error when clicking the enter key', async () => {
      render(renderWithTheme(<Search />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jd');

      await userEvent.keyboard('{Enter}');

      const labelText = screen
        .getAllByText('Please, type three chars at least')
        .find((domElement) => domElement.tagName === 'LABEL');

      expect(labelText).toBeInTheDocument();
    });
  });

  describe('when typing more than two chars', () => {
    it('displays the matched suggestions', async () => {
      render(renderWithTheme(<Search />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      const suggestions = await screen.findByRole('grid');
      expect(suggestions.children.length).toBe(6);

      expect(screen.getByText('jdm')).toBeInTheDocument();
      expect(screen.getByText('jdma')).toBeInTheDocument();
      expect(screen.getByText('jdmac')).toBeInTheDocument();
      expect(screen.getByText('jdmattheus')).toBeInTheDocument();
      expect(screen.getByText('jdmav')).toBeInTheDocument();
      expect(screen.getByText('jdmaw')).toBeInTheDocument();
    });

    it('displays the pagination with the correct selected page', async () => {
      render(renderWithTheme(<Search />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      const pagination = screen.getByRole('navigation');
      const paginationItems = pagination.querySelectorAll('li');
      expect(paginationItems.length).toBe(2);

      expect(
        screen.getByRole('button', {
          name: /page 1/,
        }),
      ).toHaveClass('Mui-selected');
      expect(
        screen.getByRole('button', {
          name: /Go to page 2/,
        }),
      ).not.toHaveClass('Mui-selected');
    });

    it('hides the pagination after untyping', async () => {
      render(renderWithTheme(<Search />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      expect(screen.getByRole('navigation')).toBeInTheDocument();

      await userEvent.clear(screen.getByPlaceholderText('Type user name...'));

      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });

    it('displays the next matched suggestions when clicking next pagination', async () => {
      render(renderWithTheme(<Search />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      await userEvent.click(
        screen.getByRole('button', {
          name: /Go to page 2/,
        }),
      );

      const suggestions = screen.getByRole('grid');
      expect(suggestions.children.length).toBe(2);
      expect(screen.getByText('jdmit')).toBeInTheDocument();
      expect(screen.getByText('jdmiguel')).toBeInTheDocument();

      expect(
        screen.getByRole('button', {
          name: /Go to page 1/,
        }),
      ).not.toHaveClass('Mui-selected');
      expect(
        screen.getByRole('button', {
          name: /page 2/,
        }),
      ).toHaveClass('Mui-selected');
    });
  });

  describe('when refining the search', () => {
    it('displays a specific suggestion', async () => {
      render(renderWithTheme(<Search />));

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdmiguel');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      const suggestions = screen.getByRole('grid');
      expect(suggestions.children.length).toBe(1);

      expect(screen.getByText('jdmiguel')).toBeInTheDocument();
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });
});
