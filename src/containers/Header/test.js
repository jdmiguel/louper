import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Header from '.';

Enzyme.configure( {adapter: new EnzymeAdapter()} );

/**
 * Factory function to create a shallowWrapper for the Counter Component
 * @function setup
 * @param {object} props - Component props especificf for this setup 
 * @returns {ShallowWrapper}
 */

const setup = (props={}) => {
    const wrapper = shallow(<Header {...props}/>);
    return wrapper;
}

/**
 * Return ShalloWrapper containing node(s) with the given data value
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */


const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

test('renders without error', () => {
    const wrapper = setup();
    const counterComponent = findByTestAttr(wrapper,'component-header');
    expect(counterComponent.length).toBe(1);
});