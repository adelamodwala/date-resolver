import * as dateUtils from '../lib/dateUtils';
import * as Constants from './constants';

const tomorrow = (dateUtils.getDateDaysAgo(new Date(), -1)).getTime();
const CONSTRAINT = Constants.CONSTRAINT;

/**
 * Find the lower bound for result
 * @param {Array} constraints 
 * @param {Object} result 
 */
export function findLowerBound(constraints, result) {
    const greaterThans = constraints.filter(item => item.type === CONSTRAINT.GREATER_THAN);
    if (greaterThans.length > 0) {
        // Get the largest value for the upper bound
        result.min = Math.max.apply(0, greaterThans.map(x => x.value));
    }

    return result;
}

/**
 * Find the upper bound for the result
 * @param {Array} constraints 
 * @param {Object} result 
 */
export function findUpperBound(constraints, result) {
    const lessThans = constraints.filter(item => item.type === CONSTRAINT.LESS_THAN);
    if (lessThans.length > 0) {
        // Get the smallest value for the upper bound
        result.max = Math.min.apply(0, lessThans.map(x => x.value));
    }

    return result;
}

/**
 * Return true if the bounds set are valid
 */
export function validateBounds(result) {
    return !result.max                  // Max is not set
        || result.max > result.min;     // Max is greater than the min
}

/**
 * Set blocked dates from given constraints
 * @param {Array} constraints 
 * @param {Object} result 
 */
export function blockDates(constraints, result) {
    const blocked = constraints.filter(item => item.type === CONSTRAINT.NOT_EQUAL);
    if (blocked.length > 0) {
        // Set all the blocked dates
        result.blocked = blocked.map(x => x.value);
    }

    return result;
}

/**
 * Filter blocked dates by given bounds
 * @param {Object} result
 */
export function filterBlockedDatesByBounds(result) {
    if(!!result.min && result.min > 0) {
        result.blocked = result.blocked.filter(x => x >= result.min);
    }
    if(!!result.max && result.max > 0) {
        result.blocked = result.blocked.filter(x => x <= result.max);
    }

    return result;
}

/**
 * Perform a resolution of the given set of constraints
 * @param constraints
 * @returns {{min: number, max: null, resolved: boolean}}
 */
export function resolve(constraints) {
    let result = {
        min: tomorrow,
        max: null,
        resolved: true,
        blocked: []
    };

    // Find the lower bound
    result = findLowerBound(constraints, result);
    // Find the upper bound
    result = findUpperBound(constraints, result);

    // Check if the bounds are valid and non-overlapping
    if (!validateBounds(result)) {
        // The bounds are overlapping and thus results are invalid
        result.min = null;
        result.max = null;
        result.resolved = false;
    }
    else {
        // The bounds are valid and non-overlapping. Continue to resolve.
        result = blockDates(constraints, result);
        result = filterBlockedDatesByBounds(result);
    }

    return result;
}