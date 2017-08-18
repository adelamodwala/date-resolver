import { combineReducers } from 'redux';
import {default as constraints} from './constraints/constraintsReducer';

/**
 * Export our root reducer
 */
export default combineReducers({
    constraints
});
