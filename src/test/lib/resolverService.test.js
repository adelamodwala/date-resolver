import * as resolveService from '../../lib/resolverService';

describe('resolverService tests', () => {

    it('resolve when valid single minimum bound then limit results to minimum bound', () => {
        const beforeTime = (new Date("December 31, 2017")).getTime();
        const afterTime = (new Date("December 9, 2017")).getTime();

        const constraints = [
            {
                type: resolveService.CONSTRAINT.LESS_THAN,
                value: beforeTime
            }, {
                type: resolveService.CONSTRAINT.GREATER_THAN,
                value: afterTime
            }
        ];

        let result = resolveService.resolve(constraints);
        console.log(result);
    });

});