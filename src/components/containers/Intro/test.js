import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';

import Intro from '.';

import { findByTestAttr, checkProps } from '../../../utils/testUtils';
import { intro } from '../../../utils/testLiterals';

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

describe('No conditional rendered elements', () => {
    let wrapper;

    beforeEach( () => {
        wrapper = setup();
    });

    test('renders div container without error', () => {
        const container = findByTestAttr(wrapper, intro.container);
    
        expect(container.length).toBe(1);
    });
    
    test('renders githubCorner component without error', () => {
        const githubCornerComponent = findByTestAttr(wrapper,intro.githubCorner);
    
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
});

test('does not warning with expected props', () => {
    const expectedProps = { 
        setData: PropTypes.func.isRequired,
        outIntro: PropTypes.func.isRequired
    }

    checkProps(Intro, expectedProps);
});

test('Btn component is rendered when userSelected state is not empty', () => {
    const userSelected = 'prueba';
    const wrapper = setup(null,{ userSelected });
    const btnComponent = findByTestAttr(wrapper, intro.btn);

    expect(btnComponent.length).toBe(1);
});

test('Btn component is not rendered when userSelected state is empty', () => {
    const userSelected = '';
    const wrapper = setup(null,{ userSelected });
    const btnComponent = findByTestAttr(wrapper, intro.btn);

    expect(btnComponent.length).toBe(0);
});

test('Loader component is rendered when isLoaderVisible state is true', () => {
    const isLoaderVisible = true;
    const wrapper = setup(null,{ isLoaderVisible });
    const loaderComponent = findByTestAttr(wrapper, intro.loader);

    expect(loaderComponent.length).toBe(1);
});

test('Loader component is not rendered when isLoaderVisible state is false', () => {
    const isLoaderVisible = false;
    const wrapper = setup(null,{ isLoaderVisible });
    const loaderComponent = findByTestAttr(wrapper, intro.loader);

    expect(loaderComponent.length).toBe(0);
});

test('ErrorModal component is rendered when onErrorModal state is true', () => {
    const onErrorModal = true;
    const wrapper = setup(null,{ onErrorModal });
    const errorModalComponent = findByTestAttr(wrapper, intro.errorModal);

    expect(errorModalComponent.length).toBe(1);
});

test('ErrorModal component is not rendered when onErrorModal state is false', () => {
    const onErrorModal = false;
    const wrapper = setup(null,{ onErrorModal });
    const errorModalComponent = findByTestAttr(wrapper, intro.errorModal);

    expect(errorModalComponent.length).toBe(0);
});

test('update userSelected state when input changes', () => {
    const wrapper = setup();

    const inputComponent = findByTestAttr(wrapper, intro.input);
    inputComponent.simulate('change', { target: { value: 'txt' } });
    wrapper.update();

    expect(wrapper.state().userSelected).toBe('txt');
});

test('Loader component is rendered when btn is clicked', () => {
    const userSelected = 'prueba';
    const wrapper = setup(null,{userSelected});
    
    const btnComponent = findByTestAttr(wrapper, intro.btn);
    btnComponent.simulate('click');
    wrapper.update();
    
    const loaderComponent = findByTestAttr(wrapper, intro.loader);
    expect(loaderComponent.length).toBe(1);
});


