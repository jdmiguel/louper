import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

/* components */
import Finder from '.';

/* utils */
import { findByTestAttr, checkProps, finder } from '../../utils/testUtils';
import { errorLiterals } from '../../utils';

const defaultProps = {
  setUserData: PropTypes.func.isRequired,
};

/**
 * Factory function to create a shallowWrapper for the Counter Component
 * @function setup
 * @param {object} props - Component props especificf for this setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Finder {...setupProps} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

// Check props

test('does not warning with expected props', () => {
  const expectedProps = {
    setUserData: PropTypes.func.isRequired,
  };

  checkProps(finder, expectedProps);
});

// No conditional rendering

describe('No conditional rendered elements', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('div container is rendered without error', () => {
    const container = findByTestAttr(wrapper, finder.container);

    expect(container.length).toBe(1);
  });

  test('GithubCorner component is rendered without error', () => {
    const githubCornerComponent = findByTestAttr(wrapper, finder.githubCorner);

    expect(githubCornerComponent.length).toBe(1);
  });

  test('Header component is rendered without error', () => {
    const headerComponent = findByTestAttr(wrapper, finder.header);

    expect(headerComponent.length).toBe(1);
  });

  test('Input component is rendered without error', () => {
    const inputComponent = findByTestAttr(wrapper, finder.input);

    expect(inputComponent.length).toBe(1);
  });

  test('Btn component is not rendered ', () => {
    const btnComponent = findByTestAttr(wrapper, finder.btn);

    expect(btnComponent.length).toBe(0);
  });

  test('Loader component is not rendered', () => {
    const loaderComponent = findByTestAttr(wrapper, finder.loader);

    expect(loaderComponent.length).toBe(0);
  });

  test('ErrorModal is not rendered', () => {
    const errorModalComponent = findByTestAttr(wrapper, finder.errorModal);

    expect(errorModalComponent.length).toBe(0);
  });
});

// Conditional rendering

test('Btn component is rendered when input shows at least one character', () => {
  const wrapper = setup();

  const inputComponent = findByTestAttr(wrapper, finder.input);
  inputComponent.simulate('change', { target: { value: 'a' } });

  const btnComponent = findByTestAttr(wrapper, finder.btn);
  expect(btnComponent.length).toBe(1);
});

test('Loader component is rendered when btn is clicked', () => {
  const wrapper = setup(null, { userSelected: 'sample' });

  const btnComponent = findByTestAttr(wrapper, finder.btn);
  btnComponent.simulate('click');

  const loaderComponent = findByTestAttr(wrapper, finder.loader);
  expect(loaderComponent.length).toBe(1);
});

test('Loader component is not rendered when enter key is pressed and userSelected state is empty', () => {
  const wrapper = setup(null, { userSelected: '' });

  const inputComponent = findByTestAttr(wrapper, finder.input);
  inputComponent.simulate('keyUp', { keyCode: 13 });

  const loaderComponent = findByTestAttr(wrapper, finder.loader);
  expect(loaderComponent.length).toBe(0);
});

test('Loader component is rendered when enter key is pressed and userSelected state is not empty', () => {
  const wrapper = setup(null, { userSelected: 'sample' });

  const inputComponent = findByTestAttr(wrapper, finder.input);
  inputComponent.simulate('keyUp', { keyCode: 13 });

  const loaderComponent = findByTestAttr(wrapper, finder.loader);
  expect(loaderComponent.length).toBe(1);
});

// Data fetching

describe('user data fetching', () => {
  const userSelected = 'jdmiguel';
  const userNotFound = 'asdhfjauhesdriahser8y9qw38r4eoiAJDFSADJS';
  const userData = {
    login: 'jdmiguel',
    id: 7016824,
  };
  const { maximumRequest, unavailableUser } = errorLiterals;

  let instance = null;
  let mock = null;
  let wrapper = null;

  beforeEach(() => {
    instance = axios.create();
    mock = new MockAdapter(axios);

    wrapper = setup(null, { userSelected });

    const btnComponent = findByTestAttr(wrapper, finder.btn);
    btnComponent.simulate('click');
  });

  test('when service returns a 200, user data is received from API', () => {
    const endPoint = `https://api.github.com/users/${userSelected}`;
    mock.onGet(endPoint).reply(200, userData);

    return instance.get(endPoint).then((response) => {
      const {
        data: { login, id },
      } = response;
      const currentUserData = {
        login,
        id,
      };
      expect(currentUserData).toEqual(userData);
    });
  });

  test('Error modal is rendered with maximumRequest message when service returns a 403 error', () => {
    const endPoint = `https://api.github.com/users/${userSelected}`;
    mock.onGet(endPoint).networkError();

    return instance.get(endPoint).catch((error) => {
      expect(error.response.status).toBe(403);

      const errorModal = findByTestAttr(wrapper, finder.errorModal);
      expect(errorModal.length).toBe(1);
      expect(errorModal.prop('msg')).toBe(maximumRequest);
    });
  });

  test('Error modal is rendered with unavailableUser message when service returns a 404 error', () => {
    const endPoint = `https://api.github.com/users/${userNotFound}`;
    mock.onGet(endPoint).networkError();

    return instance.get(endPoint).catch((error) => {
      expect(error.response.status).toBe(404);

      const errorModal = findByTestAttr(wrapper, finder.errorModal);
      expect(errorModal.length).toBe(1);
      expect(errorModal.prop('msg')).toBe(unavailableUser);
    });
  });
});
