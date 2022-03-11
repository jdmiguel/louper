// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import handlers from './handlers';

// Declare which API requests to mock
const server = setupServer(...handlers);

export { server, rest };
