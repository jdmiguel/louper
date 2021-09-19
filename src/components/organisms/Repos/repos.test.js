import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

/* components */
import Repos from '.';

/* utils */
import { findByTestAttr, checkProps, repos } from '../../../utils/testUtils';
import { reposModel } from '../../../utils/models';

const defaultProps = {
  reposData: reposModel,
  onFetchRepos: PropTypes.func,
};

/**
 * Factory function to create a shallowWrapper for the Counter Component
 * @function setup
 * @param {object} props - Component props especificf for this setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Repos {...setupProps} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

// Check props

test('does not warning with expected props', () => {
  const expectedProps = {
    repos: reposModel,
    onFetchRepos: PropTypes.func,
  };
  checkProps(repos, expectedProps);
});

// Data fetching

const fakeReposList = [{ name: 'banner_js', id: 82056180 }];

test('when service returns a 200, a not empty array is received from API', () => {
  const endPoint = 'https://api.github.com/users/jdmiguel/repos';
  const instance = axios.create();
  const mock = new MockAdapter(axios);

  mock.onGet(endPoint).reply(200, fakeReposList);

  return instance.get(endPoint).then((response) => {
    expect(response.data[0].name).toEqual(fakeReposList[0].name);
  });
});

// Conditional rendering

describe('if data contains at least one element', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ repos: fakeReposList });
  });

  test('div container is rendered when data state is not empty', () => {
    const container = findByTestAttr(wrapper, repos.container);

    expect(container.length).toBe(1);
  });

  test('Loader is not rendered when data state is not empty', () => {
    const loaderComponent = findByTestAttr(wrapper, repos.loader);

    expect(loaderComponent.length).toBe(0);
  });

  test('repo item is rendered without error', () => {
    const item = findByTestAttr(wrapper, repos.item);

    expect(item.length).toBe(1);
  });

  test('repo icon is rendered without error', () => {
    const icon = findByTestAttr(wrapper, repos.icon);

    expect(icon.length).toBe(1);
  });

  test('repo name is rendered without error', () => {
    const name = findByTestAttr(wrapper, repos.name);

    expect(name.length).toBe(1);
  });
});

describe('if data contains zero elements', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ repos: [] });
  });

  test('div container is not rendered when data state is empty', () => {
    const container = findByTestAttr(wrapper, repos.container);

    expect(container.length).toBe(0);
  });

  test('Loader component is rendered when data state is empty', () => {
    const loaderComponent = findByTestAttr(wrapper, repos.loader);

    expect(loaderComponent.length).toBe(1);
  });
});
