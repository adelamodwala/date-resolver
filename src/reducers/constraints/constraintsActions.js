import { constraintsActionTypes } from "../../lib/actionKeys";

export function addConstraint(constraint) {
    return {
        type: constraintsActionTypes.ADD_CONSTRAINT,
        constraint
    }
}

export function resetConstraints() {
    return {
        type: constraintsActionTypes.RESET
    }
}