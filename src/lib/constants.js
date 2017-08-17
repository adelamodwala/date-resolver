import keyMirror from 'key-mirror';


export const CONSTRAINT = keyMirror({
    LESS_THAN: null,
    GREATER_THAN: null,
    NOT_EQUAL: null
});

export const CONSTRAINT_LABEL = {
    [CONSTRAINT.LESS_THAN]: "Be Before",
    [CONSTRAINT.GREATER_THAN]: "Be After",
    [CONSTRAINT.NOT_EQUAL]: "Not Be"
};