import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';

/* components */
import Menu from '.';

/* utils */
import { findByTestAttr, checkProps } from '../../utils/testUtils';
import { menu } from '../../utils/testLiterals';
import { menuTabsModel } from '../../utils/models';

const defaultProps = {
  tabs: menuTabsModel,
  onClick: PropTypes.func.isRequired,
};

/**
 * Factory function to create a shallowWrapper for the Counter Component
 * @function setup
 * @param {object} props - Component props especificf for this setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Menu {...setupProps} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

// Check props

test('does not warning with expected props of menu component', () => {
  const expectedProps = {
    tabs: menuTabsModel,
    onClick: PropTypes.func.isRequired,
  };
  checkProps(Menu, expectedProps);
});

// No conditional rendering

describe('rendered no conditional menu component elements', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('div container is rendered without error', () => {
    const container = findByTestAttr(wrapper, menu.container);

    expect(container.length).toBe(1);
  });

  test('Tabs component is rendered without error', () => {
    const tabs = findByTestAttr(wrapper, menu.tabs);

    expect(tabs.length).toBe(1);
  });

  test('Tab user data component is rendered without error', () => {
    const tabUserData = findByTestAttr(wrapper, menu.tabUserData);

    expect(tabUserData.length).toBe(1);
  });
});

// Conditional rendering

test('Tab user repos component is rendered when repos property from tabs object prop received is more than cero', () => {
  const wrapper = setup({ tabs: { repos: 1 } });

  const tabUserRepos = findByTestAttr(wrapper, menu.tabUserRepos);
  expect(tabUserRepos.length).toBe(1);
});

test('Tab user repos component is not rendered when repos property from tabs object prop received is cero', () => {
  const wrapper = setup({ tabs: { repos: 0 } });

  const tabUserRepos = findByTestAttr(wrapper, menu.tabUserRepos);
  expect(tabUserRepos.length).toBe(0);
});

test('Tab user following component is rendered when following property from tabs object prop received is more than cero', () => {
  const wrapper = setup({ tabs: { following: 1 } });

  const tabUserFollowing = findByTestAttr(wrapper, menu.tabUserFollowing);
  expect(tabUserFollowing.length).toBe(1);
});

test('Tab user following component is not rendered when following property from tabs object prop received is cero', () => {
  const wrapper = setup({ tabs: { following: 0 } });

  const tabUserFollowing = findByTestAttr(wrapper, menu.tabUserFollowing);
  expect(tabUserFollowing.length).toBe(0);
});

test('Tab user followers component is rendered when followers property from tabs object prop received is more than cero', () => {
  const wrapper = setup({ tabs: { followers: 1 } });

  const tabUserFollowers = findByTestAttr(wrapper, menu.tabUserFollowers);
  expect(tabUserFollowers.length).toBe(1);
});

test('Tab user followers component is not rendered when followers property from tabs object prop received is cero', () => {
  const wrapper = setup({ tabs: { followers: 0 } });

  const tabUserFollowers = findByTestAttr(wrapper, menu.tabUserFollowers);
  expect(tabUserFollowers.length).toBe(0);
});
