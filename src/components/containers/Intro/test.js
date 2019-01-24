import React from 'react';
import { shallow } from 'enzyme';

import Intro from '.';

import { findByTestAttr } from '../../../utils/testUtils';

/**
 * Factory function to create a shallowWrapper for the Counter Component
 * @function setup
 * @param {object} props - Component props especificf for this setup 
 * @returns {ShallowWrapper}
 */

const setup = (props={}) => {
    const wrapper = shallow(<Intro {...props}/>);
    return wrapper;
}

test('renders div container without error', () => {
    const wrapper = setup();
    const counterComponent = findByTestAttr(wrapper,'container-intro');
    expect(counterComponent.length).toBe(1);
});

test('renders githubCorner component without error', () => {
    const wrapper = setup();
    const counterComponent = findByTestAttr(wrapper,'component-githubCorner');
    expect(counterComponent.length).toBe(1);
});

test('renders Header component without error', () => {
    const wrapper = setup();
    const counterComponent = findByTestAttr(wrapper,'component-header');
    expect(counterComponent.length).toBe(1);
});

test('renders Input component without error', () => {
    const wrapper = setup();
    const counterComponent = findByTestAttr(wrapper,'component-input');
    expect(counterComponent.length).toBe(1);
});


