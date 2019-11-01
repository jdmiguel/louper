import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import moxios from 'moxios';

import Intro from '.';

import { findByTestAttr, checkProps } from '../../utils/testUtils';
import { intro } from '../../utils/testLiterals';

const defaultProps = {
  setUserData: PropTypes.func.isRequired
};

/**
 * Factory function to create a shallowWrapper for the Counter Component
 * @function setup
 * @param {object} props - Component props especificf for this setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Intro {...setupProps} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

// No conditional rendering

describe('No conditional rendered elements', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders div container without error', () => {
    const container = findByTestAttr(wrapper, intro.container);

    expect(container.length).toBe(1);
  });

  test('renders githubCorner component without error', () => {
    const githubCornerComponent = findByTestAttr(wrapper, intro.githubCorner);

    expect(githubCornerComponent.length).toBe(1);
  });

  test('renders Header component without error', () => {
    const headerComponent = findByTestAttr(wrapper, intro.header);

    expect(headerComponent.length).toBe(1);
  });

  test('renders Input component without error', () => {
    const inputComponent = findByTestAttr(wrapper, intro.input);

    expect(inputComponent.length).toBe(1);
  });

  test('no renders Btn', () => {
    const btnComponent = findByTestAttr(wrapper, intro.btn);

    expect(btnComponent.length).toBe(0);
  });

  test('no renders Loader', () => {
    const loaderComponent = findByTestAttr(wrapper, intro.loader);

    expect(loaderComponent.length).toBe(0);
  });

  test('no renders ErrorModal', () => {
    const errorModalComponent = findByTestAttr(wrapper, intro.errorModal);

    expect(errorModalComponent.length).toBe(0);
  });
});

test('does not warning with expected props', () => {
  const expectedProps = {
    setUserData: PropTypes.func.isRequired
  };

  checkProps(Intro, expectedProps);
});

// Conditional rendering

test('Btn component is rendered when input shows at least one character', () => {
  const wrapper = setup();

  const inputComponent = findByTestAttr(wrapper, intro.input);
  inputComponent.simulate('change', { target: { value: 'r' } });
  wrapper.update();

  const btnComponent = findByTestAttr(wrapper, intro.btn);

  expect(btnComponent.length).toBe(1);
});

test('Loader component is rendered when btn is clicked', () => {
  const userSelected = 'testUser';
  const wrapper = setup(null, { userSelected });

  const btnComponent = findByTestAttr(wrapper, intro.btn);
  btnComponent.simulate('click');
  wrapper.update();

  const loaderComponent = findByTestAttr(wrapper, intro.loader);
  expect(loaderComponent.length).toBe(1);
});

// TO-DO
// test('Mock service', () => {
// });
// test('ErrorModal component is rendered when service fail', () => {
// });
// test('ErrorModal component shows suitable msg when user exceds the maximum number of request allowed', () => {
// });
// test('ErrorModal component shows suitable msg when user searchs an unavailable github user', () => {
// });
// test('ErrorModal component is hidden when user click in try again button', () => {
// });

describe('user data fetching', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
});
