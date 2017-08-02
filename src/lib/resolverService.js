import * as dateUtils from '../lib/dateUtils';
import * as Constants from './constants';

const tomorrow = (dateUtils.getDateDaysAgo(new Date(), -1)).getTime();
const CONSTRAINT = Constants.CONSTRAINT;

/**
 * Perform a resolution of the given set of constraints
 * @param constraints
 * @returns {{min: number, max: null, resolved: boolean}}
 */
export function resolve(constraints) {
    const result = {
        min: tomorrow,
        max: null,
        resolved: true
    };

    // Find the lower bound
    const greaterThans = constraints.filter(item => item.type === CONSTRAINT.GREATER_THAN);
    if (greaterThans.length > 0) {
        // Get the largest value for the upper bound
        result.min = Math.max.apply(0, greaterThans.map(x => x.value));
    }

    // Find an upper bound
    const lessThans = constraints.filter(item => item.type === CONSTRAINT.LESS_THAN);
    if (lessThans.length > 0) {
        // Get the smallest value for the upper bound
        result.max = Math.min.apply(0, lessThans.map(x => x.value));
    }

    // Check if the bounds are valid and non-overlapping
    if (
        !!result.max                // Max is set
        && result.max < result.min  // Max is less than the min
    ) {
        // The bounds are overlapping and thus results are invalid
        result.min = null;
        result.max = null;
        result.resolved = false;
    }
    else {
        // The bounds are valid and non-overlapping. Continue to resolve.
        // constraints.map((item, i) => {
        //     console.log(item.type, new Date(item.value), i);
        //
        // });
    }

    return result;
}