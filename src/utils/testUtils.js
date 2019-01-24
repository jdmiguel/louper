/**
 * Return ShalloWrapper containing node(s) with the given data value
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */


export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);