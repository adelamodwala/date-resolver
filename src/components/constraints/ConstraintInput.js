import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as constraintActions from '../../reducers/constraints/constraintsActions';
import * as Constants from '../../lib/constants';

import './ConstraintInput.css';

import SelectList from '../common/SelectList';
import DatePicker from "../common/DatePicker";
import * as dateUtils from "../../lib/dateUtils";

const tomorrow = dateUtils.getDateDaysAgo(new Date(), -1);

class ConstraintInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultDate: tomorrow
        }
    }

    componentWillReceiveProps(nextProps) {
        let defaultDate = null;
        if(nextProps.currentInput.boundary === Constants.CONSTRAINT.GREATER_THAN) {
            defaultDate = tomorrow;
        }
        this.setState({defaultDate});
    }

    onConstraintSelect(option) {
        console.log(option);
        this.props.actions.setConstraintInputBoundary(option.type);
    }

    onDateSelect(date) {
        console.log(date);
    }

    render() {
        return (
            <div className="ConstraintInput">
                <div className="ConstraintInput-text">The day must</div>
                <SelectList onItemSelect={option => this.onConstraintSelect(option)}
                            options={[{
                                label: 'Be After',
                                type: Constants.CONSTRAINT.GREATER_THAN
                            }, {
                                label: 'Be Before',
                                type: Constants.CONSTRAINT.LESS_THAN
                            }]}/>
                <DatePicker value={this.state.defaultDate}
                            minDate={tomorrow}
                            onDateSelect={date => this.onDateSelect(date)}/>
            </div>
        );
    }
}

ConstraintInput.propTypes = {};

const mapStateToProps = (state) => {
    const {currentInput} = state.constraints;
    return {
        currentInput
    };
};

function mapDispatchToProps(dispatch) {
    let {setConstraintInputBoundary} = constraintActions;
    const dispatchActions = bindActionCreators({setConstraintInputBoundary}, dispatch);
    return {
        dispatch,
        actions: dispatchActions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintInput);