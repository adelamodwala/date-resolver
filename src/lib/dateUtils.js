import moment from 'moment';

// A library to provide date utilities

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

/**
 * Return the beginning of the day
 * @param date
 * @returns {*}
 */
export function getBeginningOfDay(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

/**
 * Get the monday prior to the given date
 * @param date
 * @returns {*}
 */
export function getMonday( date ) {
    let day = date.getDay() || 7; // Get current day number, converting Sun. to 7
    if( day !== 1 )
        date.setHours(-24 * (day - 1));
    return date;
}

/**
 * Get the beginning of the current month
 * @returns {Date}
 */
export function getBeginningOfCurrentMonth(date) {
    return moment(date).startOf('month').toDate();
}

/**
 * Get the beginning of the current year
 * @returns {Date}
 */
export function getBeginningOfCurrentYear(date) {
    date = new Date(date.getFullYear(), 0, 1);
    return getBeginningOfDay(date);
}

/**
 * Return the date n days ago from now sanitized to beginning of computed date
 * @param n
 * @returns {Date}
 */
export function getDateDaysAgo(date, n) {
    let newDate = new Date(date);
    newDate.setDate(date.getDate() - n);
    return getBeginningOfDay(newDate);
}

/**
 * Get the day of week from 1-7 (Mon - Sun)
 * @param date
 * @returns {*}
 */
export function getDayOfWeek(date) {
    return moment(date).isoWeekday();
}

/**
 * Return the Date away from the given date by the number of given days
 * @param date
 * @param n
 * @returns {Date|*}
 */
export function getDateDaysFromNow(date, n) {
    return moment(date).add(n, 'days').toDate();
}

/**
 * Return the number of days in the month of the given date
 * @param date
 * @returns {*}
 */
export function getDaysInMonth(date) {
    return moment(date).daysInMonth();
}

/**
 * Return the number of left days in the mont of the current date
 * @param date
 * @returns {number}
 */
export function getDaysLeftInMonth(date) {
    let mDate = moment(date);
    return mDate.daysInMonth() - mDate.date();
}

/**
 * Return the difference in days between two dates
 * @param startDate
 * @param endDate
 * @returns {*}
 */
export function getDaysBetween(startDate, endDate) {
    let start = moment(startDate);
    let end = moment(endDate);
    return end.diff(start, "days") + 1;
}

/**
 * Return true of the given date is from today
 * @param date
 * @returns {bool|boolean}
 */
export function isToday(date) {
    let givenDate = moment(date);
    return moment().startOf('day').isBefore(givenDate) && moment().endOf('day').isAfter(givenDate);
}