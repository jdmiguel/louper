import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

/* components */
import UserFollowers from '.';

/* utils */
import { findByTestAttr, checkProps } from '../../../utils/testUtils';
import { userFollowers } from '../../../utils/testLiterals';
import { followDataModel } from '../../../utils/models';

const defaultProps = {
  setFollowersData: PropTypes.func,
  followersData: followDataModel
};

/**
 * Factory function to create a shallowWrapper for the Counter Component
 * @function setup
 * @param {object} props - Component props especificf for this setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<UserFollowers {...setupProps} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

// Check props

test('does not warning with expected props', () => {
  const expectedProps = {
    setFollowersData: PropTypes.func,
    followersData: followDataModel
  };
  checkProps(UserFollowers, expectedProps);
});

// Data fetching

const fakeFollowersList = [{ login: 'jdmigueldev', id: 35956302 }];

test('when service returns a 200, a not empty array is received from API', () => {
  const endPoint = 'https://api.github.com/users/jdmiguel/followers';
  const instance = axios.create();
  const mock = new MockAdapter(axios);

  mock.onGet(endPoint).reply(200, fakeFollowersList);

  return instance.get(endPoint).then(response => {
    expect(response.data[0].login).toEqual(fakeFollowersList[0].login);
  });
});

// Conditional rendering

test('Loader component is rendered when data state is empty', () => {
  const wrapper = setup();

  const loaderComponent = findByTestAttr(wrapper, userFollowers.loader);
  expect(loaderComponent.length).toBe(1);
});

test('Loader component is not rendered when data state is not empty', () => {
  const wrapper = setup(null, { data: fakeFollowersList });

  const loaderComponent = findByTestAttr(wrapper, userFollowers.loader);
  expect(loaderComponent.length).toBe(0);
});

test('div container is rendered when isLoading state is false', () => {
  const wrapper = setup(null, { isLoading: false });

  const container = findByTestAttr(wrapper, userFollowers.container);
  expect(container.length).toBe(1);
});

test('div container is not rendered when isLoading state is true', () => {
  const wrapper = setup(null, { isLoading: true });

  const container = findByTestAttr(wrapper, userFollowers.container);
  expect(container.length).toBe(0);
});
