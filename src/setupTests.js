import '@testing-library/jest-dom';
import matchMediaPolyfill from 'mq-polyfill';
import { server } from './mocks/server.ts';

beforeAll(() => {
  global.innerWidth = 1440;

  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };

  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

global.ResizeObserver = require('resize-observer-polyfill');
