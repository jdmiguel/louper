import React from 'react';
import { shallow } from 'enzyme';

/* components */
import UserData from '.';

/* utils */
import { findByTestAttr, checkProps } from '../../../utils/testUtils';
import { userData } from '../../../utils/testLiterals';
import { userDataModel } from '../../../utils/models';

const defaultProps = {
  userData: userDataModel
};

/**
 * Factory function to create a shallowWrapper for the Counter Component
 * @function setup
 * @param {object} props - Component props especificf for this setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<UserData {...setupProps} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

// Check props

test('does not warning with expected props', () => {
  const expectedProps = {
    userData: userDataModel
  };
  checkProps(UserData, expectedProps);
});

// No conditional rendering

describe('No conditional rendered elements', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('div container is rendered without error', () => {
    const container = findByTestAttr(wrapper, userData.container);

    expect(container.length).toBe(1);
  });

  test('user img is rendered without error', () => {
    const image = findByTestAttr(wrapper, userData.image);

    expect(image.length).toBe(1);
  });

  test('user name is rendered without error', () => {
    const name = findByTestAttr(wrapper, userData.name);

    expect(name.length).toBe(1);
  });

  // test('user name text is equal to name prop received', () => {
  // const nameText = 'Jaime De Miguel';
  // const name = findByTestAttr(wrapper, userData.name);
  // expect(name.prop('userData[name]')).toEqual(nameText);
  // });

  test('user bio is rendered without error', () => {
    const bio = findByTestAttr(wrapper, userData.bio);

    expect(bio.length).toBe(1);
  });
});

// Conditional rendering

test('email block is rendered when email prop received is not empty', () => {
  const wrapper = setup({ userData: { email: 'jaimedmiguel@gmail.com' } });
  const email = findByTestAttr(wrapper, userData.email);

  expect(email.length).toBe(1);
});

test('email block is not rendered when email prop received is empty', () => {
  const wrapper = setup({ userData: { email: '' } });
  const email = findByTestAttr(wrapper, userData.email);

  expect(email.length).toBe(0);
});

test('location block is rendered when location prop received is not empty', () => {
  const wrapper = setup({ userData: { location: 'Madrid' } });
  const location = findByTestAttr(wrapper, userData.location);

  expect(location.length).toBe(1);
});

test('location block is not rendered when location prop received is empty', () => {
  const wrapper = setup({ userData: { location: '' } });
  const location = findByTestAttr(wrapper, userData.location);

  expect(location.length).toBe(0);
});

test('blog block is rendered when blog prop received is not empty', () => {
  const wrapper = setup({ userData: { blog: 'https://jdmiguel.com' } });
  const blog = findByTestAttr(wrapper, userData.blog);

  expect(blog.length).toBe(1);
});

test('blog block is not rendered when blog prop received is empty', () => {
  const wrapper = setup({ userData: { blog: '' } });
  const blog = findByTestAttr(wrapper, userData.blog);

  expect(blog.length).toBe(0);
});

test('company block is rendered when company prop received is not empty', () => {
  const wrapper = setup({ userData: { company: 'Atresmedia' } });
  const company = findByTestAttr(wrapper, userData.company);

  expect(company.length).toBe(1);
});

test('company block is not rendered when company prop received is empty', () => {
  const wrapper = setup({ userData: { company: '' } });
  const company = findByTestAttr(wrapper, userData.company);

  expect(company.length).toBe(0);
});
