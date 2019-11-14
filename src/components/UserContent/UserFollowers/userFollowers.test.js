import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

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
