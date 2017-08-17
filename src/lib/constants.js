import keyMirror from 'key-mirror';


export const CONSTRAINT = keyMirror({
    LESS_THAN: null,
    GREATER_THAN: null,
    NOT_EQUAL: null,
    NEVER_EQUAL: null
});

export const CONSTRAINT_LABEL = {
    [CONSTRAINT.LESS_THAN]: "Be Before",
    [CONSTRAINT.GREATER_THAN]: "Be After",
    [CONSTRAINT.NOT_EQUAL]: "Not Be",
    [CONSTRAINT.NEVER_EQUAL]: "Not Fall On A"
};

export const WEEKDAY = keyMirror({
    MONDAY: null,
    TUESDAY: null,
    WEDNESDAY: null,
    THURSDAY: null,
    FRIDAY: null,
    SATURDAY: null,
    SUNDAY: null,
});

export const WEEKDAY_LABEL = {
    [WEEKDAY.MONDAY]: "Monday",
    [WEEKDAY.TUESDAY]: "Tuesday",
    [WEEKDAY.WEDNESDAY]: "Wednesday",
    [WEEKDAY.THURSDAY]: "Thursday",
    [WEEKDAY.FRIDAY]: "Friday",
    [WEEKDAY.SATURDAY]: "Saturday",
    [WEEKDAY.SUNDAY]: "Sunday"
};