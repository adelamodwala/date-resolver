import {constraintsActionTypes} from "../../lib/actionKeys";

export function setConstraintInputBoundary(boundary) {
    return {
        type: constraintsActionTypes.SET_CONSTRAINT_INPUT_BOUNDARY,
        boundary
    }
}