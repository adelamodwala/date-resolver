import * as resolverService from '../../lib/resolverService';
import * as dateUtils from '../../lib/dateUtils';
import * as Constants from '../../lib/constants';

describe('resolverService tests', () => {

    const tomorrow = dateUtils.getDateDaysAgo(new Date(), -1);

    it('resolve when no minimum or maximum bounds given', () => {
        let result = resolverService.resolve([]);
        expect(result).toEqual({
            min: tomorrow.getTime(),
            max: null,
            resolved: true
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
            min: tomorrow.getTime(),
            max: beforeTime,
            resolved: true
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
            min: tomorrow.getTime(),
            max: beforeTime2,
            resolved: true
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
            min: afterTime,
            max: null,
            resolved: true
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
            min: afterTime1,
            max: null,
            resolved: true
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
            min: afterTime2,
            max: beforeTime1,
            resolved: true
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
            min: null,
            max: null,
            resolved: false
        });
    });

});