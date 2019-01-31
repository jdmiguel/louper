import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';

import Intro from '.';

import { findByTestAttr, checkProps } from '../../../utils/testUtils';
import { intro } from '../../../utils/testLiterals';
import ErrorModal from '../../core/ErrorModal';

const defaultProps = { 
    setUserData: PropTypes.func.isRequired,
    setUserRepos: PropTypes.func.isRequired,
    setUserFollowers: PropTypes.func.isRequired,
    setUserFollowing: PropTypes.func.isRequired,
    outIntro: PropTypes.func.isRequired
}

/**
 * Factory function to create a shallowWrapper for the Counter Component
 * @function setup
 * @param {object} props - Component props especificf for this setup 
 * @returns {ShallowWrapper}
 */

const setup = (props={}, state = null) => {
    const setupProps = {...defaultProps, ...props}
    const wrapper = shallow(<Intro {...setupProps}/>);
    if(state) wrapper.setState(state);
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

test('Btn component is rendered when isInputEmpty state is false', () => {
    const isInputEmpty = false;
    const wrapper = setup(null,{ isInputEmpty });
    const btnComponent = findByTestAttr(wrapper, intro.btn);

    expect(btnComponent.length).toBe(1);
});

test('Btn component is not rendered when isInputEmpty state is true', () => {
    const isInputEmpty = true;
    const wrapper = setup(null,{ isInputEmpty });
    const btnComponent = findByTestAttr(wrapper, intro.btn);

    expect(btnComponent.length).toBe(0);
});

test('Loader component is rendered when isLoaderVisible state is true', () => {
    const isLoaderVisible = true;
    const wrapper = setup(null,{ isLoaderVisible });
    const btnComponent = findByTestAttr(wrapper, intro.loader);

    expect(btnComponent.length).toBe(1);
});

test('Loader component is not rendered when isLoaderVisible state is false', () => {
    const isLoaderVisible = false;
    const wrapper = setup(null,{ isLoaderVisible });
    const btnComponent = findByTestAttr(wrapper, intro.loader);

    expect(btnComponent.length).toBe(0);
});

test('ErrorModal component is rendered when onErrorModal state is true', () => {
    const onErrorModal = true;
    const wrapper = setup(null,{ onErrorModal });
    const btnComponent = findByTestAttr(wrapper, intro.errorModal);

    expect(btnComponent.length).toBe(1);
});

test('ErrorModal component is not rendered when onErrorModal state is false', () => {
    const onErrorModal = false;
    const wrapper = setup(null,{ onErrorModal });
    const btnComponent = findByTestAttr(wrapper, intro.errorModal);

    expect(btnComponent.length).toBe(0);
});


