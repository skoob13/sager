const prefix = '@@api';

/**
 * The action creator helper function.
 * Receives the basic type name and returns object containing request,
 * success and failure types.
 * @param {string} type
 * @returns {Object}
 */
const typeCreator = (type, reducer) => ({
  request: `${prefix}/${type}/request`,
  success: `${prefix}/${type}/success`,
  failure: `${prefix}/${type}/failure`,
  type: reducer,
});

export default typeCreator;
