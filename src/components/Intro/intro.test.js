import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

/* components */
import Intro from '.';

/* services */
import { getUserData } from '../../services/github';

/* utils */
import { findByTestAttr, checkProps } from '../../utils/testUtils';
import { intro } from '../../utils/testLiterals';
import { errorLiterals } from '../../utils/errorLiterals';

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

  test('div container is rendered without error', () => {
    const container = findByTestAttr(wrapper, intro.container);

    expect(container.length).toBe(1);
  });

  test('GithubCorner component is rendered without error', () => {
    const githubCornerComponent = findByTestAttr(wrapper, intro.githubCorner);

    expect(githubCornerComponent.length).toBe(1);
  });

  test('Header component is rendered without error', () => {
    const headerComponent = findByTestAttr(wrapper, intro.header);

    expect(headerComponent.length).toBe(1);
  });

  test('Input component is rendered without error', () => {
    const inputComponent = findByTestAttr(wrapper, intro.input);

    expect(inputComponent.length).toBe(1);
  });

  test('Btn component is not rendered ', () => {
    const btnComponent = findByTestAttr(wrapper, intro.btn);

    expect(btnComponent.length).toBe(0);
  });

  test('Loader component is not rendered', () => {
    const loaderComponent = findByTestAttr(wrapper, intro.loader);

    expect(loaderComponent.length).toBe(0);
  });

  test('ErrorModal is not rendered', () => {
    const errorModalComponent = findByTestAttr(wrapper, intro.errorModal);

    expect(errorModalComponent.length).toBe(0);
  });
});

// Check props

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
  inputComponent.simulate('change', { target: { value: 'a' } });

  const btnComponent = findByTestAttr(wrapper, intro.btn);
  expect(btnComponent.length).toBe(1);
});

test('Loader component is rendered when btn is clicked', () => {
  const wrapper = setup(null, { userSelected: 'sample' });

  const btnComponent = findByTestAttr(wrapper, intro.btn);
  btnComponent.simulate('click');

  const loaderComponent = findByTestAttr(wrapper, intro.loader);
  expect(loaderComponent.length).toBe(1);
});

// TO-DO
// test('ErrorModal component is rendered when service fail', () => {
// });
// test('ErrorModal component shows suitable msg when user exceds the maximum number of request allowed', () => {
// });
// test('ErrorModal component shows suitable msg when user searchs an unavailable github user', () => {
// });
// test('ErrorModal component is hidden when user click in try again button', () => {
// });

describe('user data fetching', () => {
  const userSelected = 'jdmiguel';
  const userNotFound = 'asdhfjauhesdriahser8y9qw38r4eoiAJDFSADJS';
  const userData = {
    login: 'jdmiguel',
    id: 7016824,
    node_id: 'MDQ6VXNlcjcwMTY4MjQ=',
    avatar_url: 'https://avatars0.githubusercontent.com/u/7016824?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/jdmiguel',
    html_url: 'https://github.com/jdmiguel',
    followers_url: 'https://api.github.com/users/jdmiguel/followers',
    following_url:
      'https://api.github.com/users/jdmiguel/following{/other_user}',
    gists_url: 'https://api.github.com/users/jdmiguel/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/jdmiguel/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/jdmiguel/subscriptions',
    organizations_url: 'https://api.github.com/users/jdmiguel/orgs',
    repos_url: 'https://api.github.com/users/jdmiguel/repos',
    events_url: 'https://api.github.com/users/jdmiguel/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/jdmiguel/received_events',
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
  const { maximumRequest, unavailableUser } = errorLiterals;

  let instance;
  let mock;
  let wrapper;

  beforeEach(() => {
    instance = axios.create();
    mock = new MockAdapter(axios);

    wrapper = setup(null, { userSelected });

    const btnComponent = findByTestAttr(wrapper, intro.btn);
    btnComponent.simulate('click');
  });

  test('User data is received from API when service doesn´t fail', async () => {
    const endPoint = `https://api.github.com/users/${userSelected}`;
    mock.onGet(endPoint).reply(200, userData);

    return instance.get(endPoint).then(response => {
      expect(response.data).toEqual(userData);
    });
  });

  test('Error modal is showed with unavailableUser message when service retrieves a 404 error', async () => {
    const endPoint = `https://api.github.com/users/${userNotFound}`;
    mock.onGet(endPoint).networkError();

    return instance.get(endPoint).catch(error => {
      expect(error.response.status).toBe(404);

      const errorModal = findByTestAttr(wrapper, intro.errorModal);
      expect(errorModal.length).toBe(1);
      expect(errorModal.prop('msg')).toBe(unavailableUser);
    });
  });
});
