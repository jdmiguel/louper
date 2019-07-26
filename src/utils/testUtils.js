import checkPropTypes from 'check-prop-types';

/**
 * Return ShalloWrapper containing node(s) with the given data value
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */

export const findByTestAttr = (wrapper, val) =>
  wrapper.find(`[data-test="${val}"]`);

/**
 * Create error with checkPropTypes and logic implemented in order to
 * check that that error is undefined
 * @function checkProps
 * @param {JSX.Element} component - component whose properties are checked
 * @param {object} conformingProps - props checked
 */

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'props',
    component.name
  );

  expect(propError).toBeUndefined();
};
