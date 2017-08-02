import {constraintsActionTypes} from "../../lib/actionKeys";

export function addConstraint(constraint) {
    return {
        type: constraintsActionTypes.ADD_CONSTRAINT,
        constraint
    }
}