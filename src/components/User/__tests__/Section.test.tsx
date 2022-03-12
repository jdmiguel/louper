import { server, rest } from '../../../mocks/server';
import { data as reposData } from '../../../mocks/handlers/getRepos';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import Section from '../Section';

describe('<Section />', () => {
  const props = {
    userLogin: 'jdoe',
    totalItems: 4,
    onRequestError: jest.fn(),
  };

  it('displays the correct content', async () => {
    render(<Section {...props} sectionType="repos" totalItems={4} />);

    server.use(
      rest.get(`${process.env.REACT_APP_BASE_URL}/users/jdoe/repos`, (req, res, ctx) => {
        const query = req.url.searchParams;
        const page = query.get('page');

        console.log({ query });
        console.log({ page });
        return res(ctx.json(reposData));
      }),
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeVisible();
    await waitForElementToBeRemoved(loader);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jdoe')).toBeInTheDocument();
  });
});
