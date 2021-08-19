import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

/* components */
import UserFollowing from '.';

/* utils */
import { findByTestAttr, checkProps } from '../../../utils/testUtils';
import { userFollowing } from '../../../utils/testLiterals';
import { followDataModel } from '../../../utils/models';

const defaultProps = {
  setFollowingData: PropTypes.func,
  followingData: followDataModel,
};

/**
 * Factory function to create a shallowWrapper for the Counter Component
 * @function setup
 * @param {object} props - Component props especificf for this setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<UserFollowing {...setupProps} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

// Check props

test('does not warning with expected props', () => {
  const expectedProps = {
    setFollowingData: PropTypes.func,
    followingData: followDataModel,
  };
  checkProps(UserFollowing, expectedProps);
});

// Data fetching

const fakeFollowingList = [{ login: 'mzabriskie', id: 199035 }];

test('when service returns a 200, a not empty array is received from API', () => {
  const endPoint = 'https://api.github.com/users/jdmiguel/following';
  const instance = axios.create();
  const mock = new MockAdapter(axios);

  mock.onGet(endPoint).reply(200, fakeFollowingList);

  return instance.get(endPoint).then((response) => {
    expect(response.data[0].login).toEqual(fakeFollowingList[0].login);
  });
});

// Conditional rendering

describe('if data contains at least one element', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(
      { followingData: fakeFollowingList },
      { data: fakeFollowingList },
    );
  });

  test('div container is rendered when data state is not empty', () => {
    const container = findByTestAttr(wrapper, userFollowing.container);

    expect(container.length).toBe(1);
  });

  test('Loader component is not rendered when data state is not empty', () => {
    const loaderComponent = findByTestAttr(wrapper, userFollowing.loader);

    expect(loaderComponent.length).toBe(0);
  });

  test('user following name is rendered without error', () => {
    const name = findByTestAttr(wrapper, userFollowing.name);

    expect(name.length).toBe(1);
  });

  test('btn following component is rendered without error', () => {
    const btn = findByTestAttr(wrapper, userFollowing.btn);

    expect(btn.length).toBe(1);
  });

  test('user image following is rendered without error', () => {
    const image = findByTestAttr(wrapper, userFollowing.image);

    expect(image.length).toBe(1);
  });
});

describe('if data contains zero elements', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ followingData: [] }, { data: [] });
  });

  test('div container is not rendered when data state is empty', () => {
    const container = findByTestAttr(wrapper, userFollowing.container);

    expect(container.length).toBe(0);
  });

  test('Loader component is rendered when data state is empty', () => {
    const loaderComponent = findByTestAttr(wrapper, userFollowing.loader);

    expect(loaderComponent.length).toBe(1);
  });
});
