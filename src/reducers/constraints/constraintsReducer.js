import {constraintsActionTypes} from "../../lib/actionKeys";
import {CONSTRAINT} from '../../lib/constants';

const initialState = {
    currentInput: {
        boundary: CONSTRAINT.GREATER_THAN
    }
};

export default function constraintsReducer(state = initialState, action) {
    switch (action.type) {

        case constraintsActionTypes.SET_CONSTRAINT_INPUT_BOUNDARY:
            let currentInput = {
                ...state.currentInput,
                boundary: action.boundary
            };
            return {
                ...state,
                currentInput
            };

        default:
            return state;
    }
}