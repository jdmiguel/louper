import { afterAll, afterEach, beforeAll } from 'vitest';
import { ResizeObserver } from '@juggle/resize-observer';
import { fetch } from 'cross-fetch';
import matchMediaPolyfill from 'mq-polyfill';
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Add `fetch` polyfill.
global.fetch = fetch;

// Add `ResizeObserver` polyfill.
global.ResizeObserver = ResizeObserver;

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

  server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
