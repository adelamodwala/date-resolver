const today = (new Date()).getTime();
const tomorrow = (new Date(today + 24 * 60 * 60 * 1000)).getTime();
export const CONSTRAINT = {
    LESS_THAN: "LESS_THAN",
    GREATER_THAN: "GREATER_THAN"
};

export function resolve(constraints) {
    const result = {
        MIN: tomorrow,
        MAX: null
    };

    const lessThans = constraints.filter(item => item.type === CONSTRAINT.LESS_THAN && item.value > result.MIN);
    if (lessThans.length > 0) {
        result.MIN = Math.min.apply(0, lessThans.map(x => x.value));
    }

    const greaterThans = constraints.filter(item => item.type === CONSTRAINT.GREATER_THAN);
    if (greaterThans.length > 0) {
        result.MAX = Math.max.apply(0, greaterThans.map(x => x.value));
    }

    constraints.map((item, i) => {
        console.log(item.type, new Date(item.value), i);

    });

    return result;
}