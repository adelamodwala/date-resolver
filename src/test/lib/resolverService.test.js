import * as resolverService from '../../lib/resolverService';
import * as dateUtils from '../../lib/dateUtils';
import * as Constants from '../../lib/constants';

describe('resolverService tests', () => {

    const tomorrow = dateUtils.getDateDaysAgo(new Date(), -1);

    // --- resolverService.findLowerBound
    it('findLowerBound when no constraints then lower bound is not set', () => {
        expect(resolverService.findLowerBound([], {}))
            .toEqual({});
    });

    it('findLowerBound when no greater than constraints then lower bound is not set', () => {
        expect(resolverService.findLowerBound([{type: Constants.CONSTRAINT.LESS_THAN}], {}))
            .toEqual({});
    });

    it('findLowerBound when greater than constraint then lower bound is set', () => {
        let tomorrowTime = tomorrow.getTime();
        expect(resolverService.findLowerBound([{
            type: Constants.CONSTRAINT.GREATER_THAN,
            value: tomorrowTime
        }], {}))
            .toEqual({
                min: tomorrowTime
            });
    });

    it('findLowerBound when greater than constraints then lower bound is set to largest value', () => {
        let tomorrowTime = tomorrow.getTime();
        let dayAfterTomorrowTime = dateUtils.getDateDaysAgo(tomorrow, -1).getTime();
        expect(resolverService.findLowerBound([{
            type: Constants.CONSTRAINT.GREATER_THAN,
            value: dayAfterTomorrowTime
        }, {
            type: Constants.CONSTRAINT.GREATER_THAN,
            value: tomorrowTime
        }], {}))
            .toEqual({
                min: dayAfterTomorrowTime
            });
    });

    // --- resolverService.findUpperBound
    it('findUpperBound when no constraints then upper bound is not set', () => {
        expect(resolverService.findUpperBound([], {}))
            .toEqual({});
    });

    it('findUpperBound when no less than constraints then upper bound is not set', () => {
        expect(resolverService.findUpperBound([{type: Constants.CONSTRAINT.GREATER_THAN}], {}))
            .toEqual({});
    });

    it('findUpperBound when less than constraint then upper bound is set', () => {
        let tomorrowTime = tomorrow.getTime();
        expect(resolverService.findUpperBound([{
            type: Constants.CONSTRAINT.LESS_THAN,
            value: tomorrowTime
        }], {}))
            .toEqual({
                max: tomorrowTime
            });
    });

    it('findUpperBound when less than constraints then upper bound is set to smallest value', () => {
        let tomorrowTime = tomorrow.getTime();
        let dayAfterTomorrowTime = dateUtils.getDateDaysAgo(tomorrow, -1).getTime();
        expect(resolverService.findUpperBound([{
            type: Constants.CONSTRAINT.LESS_THAN,
            value: tomorrowTime
        }, {
            type: Constants.CONSTRAINT.LESS_THAN,
            value: dayAfterTomorrowTime
        }], {}))
            .toEqual({
                max: tomorrowTime
            });
    });

    // --- resolverService.validateBounds
    it('validateBounds when max not set then return true', () => {
        expect(resolverService.validateBounds({
            min: tomorrow.getTime()
        })).toEqual(true);
    });

    it('validateBounds when max set and is greater than min then return true', () => {
        expect(resolverService.validateBounds({
            min: tomorrow.getTime(),
            max: dateUtils.getDateDaysAgo(tomorrow, -3).getTime()
        })).toEqual(true);
    });

    it('validateBounds when max set and is less than min then return false', () => {
        expect(resolverService.validateBounds({
            max: tomorrow.getTime(),
            min: dateUtils.getDateDaysAgo(tomorrow, -3).getTime()
        })).toEqual(false);
    });

    // --- resolverService.blockDates
    it('blockDates when no blocked dates then do not set block dates', () => {
        expect(resolverService.blockDates([], {}))
            .toEqual({});
    });

    it('blockDates when blocked date available then set block date', () => {
        expect(resolverService.blockDates([{
            type: Constants.CONSTRAINT.NOT_EQUAL,
            value: 1234
        }], {}))
            .toEqual({
                blocked: [1234]
            });
    });

    it('blockDates when blocked dates available then set block dates', () => {
        expect(resolverService.blockDates([{
            type: Constants.CONSTRAINT.NOT_EQUAL,
            value: 1234
        }, {
            type: Constants.CONSTRAINT.NOT_EQUAL,
            value: 4455
        }, {
            type: Constants.CONSTRAINT.LESS_THAN,
            value: 5678
        }], {}))
            .toEqual({
                blocked: [1234, 4455]
            });
    });

    // --- resolverService.filterBlockedDatesByBounds
    it('filterBlockedDatesByBounds when lower bound set then filter out dates less than lower bound', () => {
        expect(resolverService.filterBlockedDatesByBounds({
            min: 10,
            blocked: [3, 11, 7, 22]
        })).toEqual({
            min: 10,
            blocked: [11, 22]
        });
    });

    it('filterBlockedDatesByBounds when upper bound set then filter out dates greater than upper bound', () => {
        expect(resolverService.filterBlockedDatesByBounds({
            max: 20,
            blocked: [3, 11, 7, 22]
        })).toEqual({
            max: 20,
            blocked: [3, 11, 7]
        });
    });

    // --- resolverService.findNeverEqualDays
    it('findNeverEqualDays when empty never equal days then do not set never equals', () => {
        expect(resolverService.findNeverEqualDays([], {}))
            .toEqual({});
    });

    it('findNeverEqualDays when never equal day given then add never equals', () => {
        expect(resolverService.findNeverEqualDays([{
            type: Constants.CONSTRAINT.NEVER_EQUAL,
            value: Constants.WEEKDAY.THURSDAY
        }], {
            neverEqual: new Set()
        }))
            .toEqual({
                neverEqual: new Set([Constants.WEEKDAY.THURSDAY])
            });
    });

    it('findNeverEqualDays when never equal days given then add never equals', () => {
        expect(resolverService.findNeverEqualDays([{
            type: Constants.CONSTRAINT.NEVER_EQUAL,
            value: Constants.WEEKDAY.THURSDAY
        }, {
            type: Constants.CONSTRAINT.NEVER_EQUAL,
            value: Constants.WEEKDAY.FRIDAY
        }, {
            type: Constants.CONSTRAINT.NEVER_EQUAL,
            value: Constants.WEEKDAY.SUNDAY
        }], {
            neverEqual: new Set([Constants.WEEKDAY.TUESDAY, Constants.WEEKDAY.SUNDAY])
        }))
            .toEqual({
                neverEqual: new Set([
                    Constants.WEEKDAY.TUESDAY,
                    Constants.WEEKDAY.SUNDAY,
                    Constants.WEEKDAY.THURSDAY,
                    Constants.WEEKDAY.FRIDAY
                ])
            });
    });

    // --- resolverService.resolve
    it('resolve when no minimum or maximum bounds given', () => {
        let result = resolverService.resolve([]);
        expect(result).toEqual({
            blocked: [],
            min: tomorrow.getTime(),
            max: null,
            resolved: true,
            neverEqual: new Set()
        });
    });

    it('resolve when valid single maximum bound then limit results to maximum bound', () => {
        const beforeTime = (new Date("December 31, 2017")).getTime();

        const constraints = [
            {
                type: Constants.CONSTRAINT.LESS_THAN,
                value: beforeTime
            }
        ];

        let result = resolverService.resolve(constraints);
        expect(result).toEqual({
            blocked: [],
            min: tomorrow.getTime(),
            max: beforeTime,
            resolved: true,
            neverEqual: new Set()
        });
    });

    it('resolve when valid multiple maximum bound then limit results to smallest maximum bound', () => {
        const beforeTime1 = (new Date("December 31, 2017")).getTime();
        const beforeTime2 = (new Date("December 18, 2017")).getTime();

        const constraints = [
            {
                type: Constants.CONSTRAINT.LESS_THAN,
                value: beforeTime1
            }, {
                type: Constants.CONSTRAINT.LESS_THAN,
                value: beforeTime2
            }
        ];

        let result = resolverService.resolve(constraints);
        expect(result).toEqual({
            blocked: [],
            min: tomorrow.getTime(),
            max: beforeTime2,
            resolved: true,
            neverEqual: new Set()
        });
    });

    it('resolve when valid single minimum bound then limit results to minimum bound', () => {
        const afterTime = (new Date("December 7, 2017")).getTime();

        const constraints = [
            {
                type: Constants.CONSTRAINT.GREATER_THAN,
                value: afterTime
            }
        ];

        let result = resolverService.resolve(constraints);
        expect(result).toEqual({
            blocked: [],
            min: afterTime,
            max: null,
            resolved: true,
            neverEqual: new Set()
        });
    });

    it('resolve when valid multiple minimum bound then limit results to largest minimum bound', () => {
        const afterTime1 = (new Date("December 31, 2017")).getTime();
        const afterTime2 = (new Date("December 18, 2017")).getTime();

        const constraints = [
            {
                type: Constants.CONSTRAINT.GREATER_THAN,
                value: afterTime1
            }, {
                type: Constants.CONSTRAINT.GREATER_THAN,
                value: afterTime2
            }
        ];

        let result = resolverService.resolve(constraints);
        expect(result).toEqual({
            blocked: [],
            min: afterTime1,
            max: null,
            resolved: true,
            neverEqual: new Set()
        });
    });

    it('resolve when multiple valid minimum and maximum bounds each then limit results to bounds', () => {

        // Ensure that this scenario:
        // ----afterTime1---afterTime2-----------beforeTime1-------beforeTime2
        // Results in [afterTime2, beforeTime1]

        const afterTime1 = (new Date("December 11, 2017")).getTime();
        const afterTime2 = (new Date("December 13, 2017")).getTime();
        const beforeTime1 = (new Date("December 19, 2017")).getTime();
        const beforeTime2 = (new Date("December 24, 2017")).getTime();

        const constraints = [
            {
                type: Constants.CONSTRAINT.GREATER_THAN,
                value: afterTime1
            }, {
                type: Constants.CONSTRAINT.LESS_THAN,
                value: beforeTime1
            }, {
                type: Constants.CONSTRAINT.GREATER_THAN,
                value: afterTime2
            }, {
                type: Constants.CONSTRAINT.LESS_THAN,
                value: beforeTime2
            }
        ];

        let result = resolverService.resolve(constraints);
        expect(result).toEqual({
            blocked: [],
            min: afterTime2,
            max: beforeTime1,
            resolved: true,
            neverEqual: new Set()
        });
    });

    it('resolve when overlapping minimum and maximum bounds then not resolved', () => {
        const afterTime = (new Date("December 31, 2017")).getTime();
        const beforeTime = (new Date("December 18, 2017")).getTime();

        const constraints = [
            {
                type: Constants.CONSTRAINT.GREATER_THAN,
                value: afterTime
            }, {
                type: Constants.CONSTRAINT.LESS_THAN,
                value: beforeTime
            }
        ];

        let result = resolverService.resolve(constraints);
        expect(result).toEqual({
            blocked: [],
            min: null,
            max: null,
            resolved: false,
            neverEqual: new Set()
        });
    });

    it('resolve when conflicting but non-overlapping minimum and maximum bounds then resolved', () => {

        const constraints = [{
            "type": Constants.CONSTRAINT.GREATER_THAN,
            "value": 1501732800000
        }, {
            "type": Constants.CONSTRAINT.GREATER_THAN,
            "value": 1501905600000
        }, {
            "type": Constants.CONSTRAINT.LESS_THAN,
            "value": 1502732800000
        }, {
            "type": Constants.CONSTRAINT.LESS_THAN,
            "value": 1502942400000
        }];

        let result = resolverService.resolve(constraints);
        expect(result).toEqual({
            blocked: [],
            min: 1501905600000,
            max: 1502732800000,
            resolved: true,
            neverEqual: new Set()
        });
    });

    it('resolve when valid block dates and bounds then resolved', () => {
        const constraints = [{
            "type": Constants.CONSTRAINT.GREATER_THAN,
            "value": 1501732800000
        }, {
            "type": Constants.CONSTRAINT.LESS_THAN,
            "value": 1502732800000
        }, {
            "type": Constants.CONSTRAINT.NOT_EQUAL,
            "value": 1501732700000  // before greater than
        }, {
            "type": Constants.CONSTRAINT.NOT_EQUAL,
            "value": 1502732900000  // after less than
        }, {
            "type": Constants.CONSTRAINT.NOT_EQUAL,
            "value": 1501732800500  // between bounds
        }];

        let result = resolverService.resolve(constraints);
        expect(result).toEqual({
            blocked: [1501732800500],
            min: 1501732800000,
            max: 1502732800000,
            resolved: true,
            neverEqual: new Set()
        });
    });

});