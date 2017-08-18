import moment from 'moment';

/**
 * A validator for email address
 * @param  {t.String} email
 * @return {Bool}     To validate Email fields based on regex
 */
export function emailValidator(email) {
    //language=JSRegexp
    return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/.test(email.toUpperCase());
}

/**
 * Return true if the object is defined and at least has 0 keys
 * @param obj
 * @returns {boolean}
 */
export function objectIsDefined(obj) {
    return obj !== undefined && obj !== null && typeof obj === "object";
}

/**
 * Return true if the object is defined and has at least one key-value pair
 * @param obj
 * @returns {boolean}
 */
export function objectIsNotEmpty(obj) {
    return objectIsDefined(obj) && Object.keys(obj).length > 0;
}

/**
 * Return true if the object is not defined or has no key-value pairs
 * @param obj
 * @returns {boolean}
 */
export function objectIsEmpty(obj) {
    return !objectIsNotEmpty(obj);
}

/**
 * Return true if the provided parameter is not an empty array
 * @param arr
 * @returns {boolean}
 */
export function arrayIsNotEmpty(arr) {
    return Array.isArray(arr) && arr.length > 0;
}

/**
 * Return true if the provided parameter is an empty array
 * @param arr
 * @returns {boolean}
 */
export function arrayIsEmpty(arr) {
    return Array.isArray(arr) && arr.length === 0;
}

/**
 * Return true if each element in arr1 is in arr2 and both are the same length
 * @param arr1
 * @param arr2
 * @returns {boolean}
 */
export function arraysAreOneToOne(arr1, arr2) {
    if(Array.isArray(arr1) && Array.isArray(arr2) && arr1.length === arr2.length) {
        let set2 = new Set(arr2);
        let diff = arr1.filter(x => !set2.has(x));
        return diff.length === 0;
    }
    return false;
}

/**
 * Return true if obj is a Javascript date object
 * @param obj
 */
export function isDate(obj) {
    return moment.isDate(obj);
}