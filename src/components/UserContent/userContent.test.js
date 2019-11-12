import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';

/* components */
import UserContent from '.';

/* utils */
import { findByTestAttr, checkProps } from '../../utils/testUtils';
import { userContent } from '../../utils/testLiterals';
import { userDataModel } from '../../utils/models';

const defaultProps = {
  userData: userDataModel,
  backIntro: PropTypes.func.isRequired
};

/**
 * Factory function to create a shallowWrapper for the Counter Component
 * @function setup
 * @param {object} props - Component props especificf for this setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<UserContent {...setupProps} />);
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

  test('Menu component is rendered without error', () => {
    const menu = findByTestAttr(wrapper, userContent.menu);

    expect(menu.length).toBe(1);
  });

  test('FloatBtn component is rendered without error', () => {
    const floatBtn = findByTestAttr(wrapper, userContent.floatBtn);

    expect(floatBtn.length).toBe(1);
  });
});

// Check props

// test('does not warning with expected props', () => {
// const expectedProps = {
// userData: userDataModel,
// backIntro: PropTypes.func.isRequired
// };
// checkProps(UserContent, expectedProps);
// });

// Conditional rendering

test('UserData component is rendered when activeSection is 0', () => {
  const wrapper = setup(null, { activeSection: 0 });

  const userDataComponent = findByTestAttr(wrapper, userContent.userData);
  expect(userDataComponent.length).toBe(1);
});

test('UserRepos component is rendered when activeSection is 1', () => {
  const wrapper = setup(null, { activeSection: 1 });

  const userReposComponent = findByTestAttr(wrapper, userContent.userRepos);
  expect(userReposComponent.length).toBe(1);
});

test('UserFollowings component is rendered when activeSection is 2', () => {
  const wrapper = setup(null, { activeSection: 2 });

  const userFollowingsComponent = findByTestAttr(
    wrapper,
    userContent.userFollowing
  );
  expect(userFollowingsComponent.length).toBe(1);
});

test('UserFollowers component is rendered when activeSection is 3', () => {
  const wrapper = setup(null, { activeSection: 3 });

  const userFollowersComponent = findByTestAttr(
    wrapper,
    userContent.userFollowers
  );
  expect(userFollowersComponent.length).toBe(1);
});
