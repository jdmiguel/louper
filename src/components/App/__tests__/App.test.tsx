import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import '@/mocks/intersectionObserverMock';
import { server } from '../../../mocks/server';
import { API_BASE_URL } from '../../../utils/request';
import App from '..';

describe('<App />', () => {
  describe('when searching users by typing more than two chars', () => {
    it('displays the correct error message when there is a 403 error', async () => {
      server.use(
        rest.get(`${API_BASE_URL}/search/users`, (_, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(<App />);

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      expect(
        await screen.findByText(
          'You have excedeed the maximum allowed request. Please, wait for a while',
        ),
      ).toBeInTheDocument();
    });

    it('displays the correct error message when there is a 404 error', async () => {
      server.use(
        rest.get(`${API_BASE_URL}/search/users`, (_, res, ctx) => {
          return res(ctx.status(404));
        }),
      );

      render(<App />);

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'bew');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      expect(screen.getByText('Please, choose an available user')).toBeInTheDocument();
    });

    it('displays the correct error message when there is a 500 error', async () => {
      server.use(
        rest.get(`${API_BASE_URL}/search/users`, (_, res, ctx) => {
          return res(ctx.status(500));
        }),
      );

      render(<App />);

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdm');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      expect(screen.getByText('Sorry! there was an error on the server side.')).toBeInTheDocument();
    });

    it('displays the user view when clicking a refined suggestion', async () => {
      render(<App />);

      const input = screen.getByPlaceholderText('Type user name...');
      await userEvent.type(input, 'jdmiguel');

      const loader = await screen.findByRole('progressbar');
      await waitForElementToBeRemoved(loader);

      await userEvent.click(
        screen.getByRole('button', {
          name: 'jdmiguel',
        }),
      );

      await waitFor(() => {
        const profile = screen.getByTestId('profile');
        expect(profile).toBeInTheDocument();
        expect(profile).toHaveTextContent('Jaime De Miguel');
        expect(profile).toHaveTextContent('Senior Frontend Engineer');
      });
    });
  });
});
