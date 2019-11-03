import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import moxios from 'moxios';

/* components */
import Intro from '.';

/* services */
import { getUserData } from '../../services/github';

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

const userSelected = 'jdmiguel';
const userData = {
  login: 'jdmiguel',
  id: 7016824,
  node_id: 'MDQ6VXNlcjcwMTY4MjQ=',
  avatar_url: 'https://avatars0.githubusercontent.com/u/7016824?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/jdmiguel',
  html_url: 'https://github.com/jdmiguel',
  followers_url: 'https://api.github.com/users/jdmiguel/followers',
  following_url: 'https://api.github.com/users/jdmiguel/following{/other_user}',
  gists_url: 'https://api.github.com/users/jdmiguel/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/jdmiguel/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/jdmiguel/subscriptions',
  organizations_url: 'https://api.github.com/users/jdmiguel/orgs',
  repos_url: 'https://api.github.com/users/jdmiguel/repos',
  events_url: 'https://api.github.com/users/jdmiguel/events{/privacy}',
  received_events_url: 'https://api.github.com/users/jdmiguel/received_events',
  type: 'User',
  site_admin: false,
  name: 'Jaime De Miguel',
  company: 'Atresmedia',
  blog: 'https://jdmiguel.com',
  location: 'Madrid',
  email: null,
  hireable: null,
  bio: 'Senior Frontend developer',
  public_repos: 24,
  public_gists: 1,
  followers: 9,
  following: 14,
  created_at: '2014-03-20T23:24:22Z',
  updated_at: '2019-10-09T14:33:31Z'
};

describe('user data fetching', () => {
  beforeEach(() => {
    moxios.install();
  });

  test('Get user data response from API', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData
      });
    });

    const response = await getUserData(userSelected);
    // console.log('response: ', response);
    expect(response).toEqual(userData);
  });

  test('Loader component is hidden when service doesn´t fail', async () => {
    const wrapper = setup();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData
      });
    });

    await getUserData(userSelected);

    const loaderComponent = findByTestAttr(wrapper, intro.loader);
    expect(loaderComponent.length).toBe(0);
  });

  afterEach(() => {
    moxios.uninstall();
  });
});
