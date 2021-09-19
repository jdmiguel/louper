import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';

/* components */
import UserContent from '.';

/* utils */
import { findByTestAttr, checkProps, user } from '../../utils/testUtils';
import { dataModel } from '../../utils/models';

const defaultProps = {
  userData: dataModel,
  onBackFinder: PropTypes.func.isRequired,
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

// Check props

test('does not warning with expected props', () => {
  const expectedProps = {
    userData: dataModel,
    onBackFinder: PropTypes.func.isRequired,
  };
  checkProps(UserContent, expectedProps);
});

// No conditional rendering

describe('No conditional rendered elements', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('Menu is rendered without error', () => {
    const menu = findByTestAttr(wrapper, userContent.menu);

    expect(menu.length).toBe(1);
  });

  test('FloatBtn is rendered without error', () => {
    const floatBtn = findByTestAttr(wrapper, userContent.floatBtn);

    expect(floatBtn.length).toBe(1);
  });
});

// Conditional rendering

test('Profile is rendered when activeSection is 0', () => {
  const wrapper = setup(null, { activeSection: 0 });

  const Profile = findByTestAttr(wrapper, user.profile);
  expect(Profile.length).toBe(1);
});

test('Repos is rendered when activeSection is 1', () => {
  const wrapper = setup(null, { activeSection: 1 });

  const Repos = findByTestAttr(wrapper, user.repos);
  expect(Repos.length).toBe(1);
});

test('Following is rendered when activeSection is 2', () => {
  const wrapper = setup(null, { activeSection: 2 });

  const Following = findByTestAttr(wrapper, user.following);
  expect(Following.length).toBe(1);
});

test('Followers is rendered when activeSection is 3', () => {
  const wrapper = setup(null, { activeSection: 3 });

  const Followers = findByTestAttr(wrapper, user.followers);
  expect(Followers.length).toBe(1);
});
