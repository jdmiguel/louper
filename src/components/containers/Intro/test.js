import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';

import Intro from '.';

import { findByTestAttr, checkProps } from '../../../utils/testUtils';
import { intro } from '../../../utils/testLiterals';

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
    const counterComponent = findByTestAttr(wrapper, intro.container);

    expect(counterComponent.length).toBe(1);
});

test('renders githubCorner component without error', () => {
    const wrapper = setup();
    const counterComponent = findByTestAttr(wrapper,intro.githubCorner);

    expect(counterComponent.length).toBe(1);
});

test('renders Header component without error', () => {
    const wrapper = setup();
    const counterComponent = findByTestAttr(wrapper, intro.header);

    expect(counterComponent.length).toBe(1);
});

test('renders Input component without error', () => {
    const wrapper = setup();
    const counterComponent = findByTestAttr(wrapper, intro.input);

    expect(counterComponent.length).toBe(1);
});

test('does not warning with expected props', () => {
    const expectedProps = { 
        setUserData: PropTypes.func.isRequired,
        setUserRepos: PropTypes.func.isRequired,
        setUserFollowers: PropTypes.func.isRequired,
        setUserFollowing: PropTypes.func.isRequired,
        outIntro: PropTypes.func.isRequired
    }

    checkProps(Intro, expectedProps);
});


