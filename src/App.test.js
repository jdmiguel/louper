import React from 'react';
import { shallow } from 'enzyme';

/* components */
import App from './App';

/* utils */
import { findByTestAttr, app } from './utils/testUtils';

/**
 * Factory function to create a shallowWrapper for the Counter Component
 * @function setup
 * @param {object} props - Component props especificf for this setup
 * @returns {ShallowWrapper}
 */

const setup = (state = null) => {
  const wrapper = shallow(<App />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

// No conditional rendering

test('renders Footer component without error', () => {
  const wrapper = setup();
  const footer = findByTestAttr(wrapper, app.footer);

  expect(footer.length).toBe(1);
});

// Conditional rendering

test('Intro component is rendered when intro state is true', () => {
  const wrapper = setup({ intro: true });
  const intro = findByTestAttr(wrapper, app.intro);

  expect(intro.length).toBe(1);
});

test('Content component is not rendered when intro state is true', () => {
  const wrapper = setup({ intro: true });
  const content = findByTestAttr(wrapper, app.userContent);

  expect(content.length).toBe(0);
});

test('Intro component is not rendered when intro state is false', () => {
  const wrapper = setup({ intro: false });
  const intro = findByTestAttr(wrapper, app.intro);

  expect(intro.length).toBe(0);
});

test('Content component is rendered when intro state is true', () => {
  const wrapper = setup({ intro: false });
  const content = findByTestAttr(wrapper, app.userContent);

  expect(content.length).toBe(1);
});
