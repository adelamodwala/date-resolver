import {constraintsActionTypes} from "../../lib/actionKeys";
import {CONSTRAINT} from '../../lib/constants';
import * as resolverService from '../../lib/resolverService';

const initialState = {
    constraints: [],
    resultSet: {}
};

export default function constraintsReducer(state = initialState, action) {
    switch (action.type) {

        case constraintsActionTypes.ADD_CONSTRAINT:
            let constraints = [...state.constraints, action.constraint];
            let resultSet = resolverService.resolve(constraints);
            return {
                ...state,
                constraints,
                resultSet
            };

        case constraintsActionTypes.RESET:
            return {
                ...initialState
            };

        default:
            return state;
    }
}