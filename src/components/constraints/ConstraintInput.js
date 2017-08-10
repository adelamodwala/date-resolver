import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as constraintActions from '../../reducers/constraints/constraintsActions';
import * as Constants from '../../lib/constants';

import './ConstraintInput.css';

import SelectList from '../common/SelectList';
import DatePicker from "../common/DatePicker";
import * as dateUtils from "../../lib/dateUtils";
import AddActionButton from "../common/AddActionButton";

const tomorrow = dateUtils.getDateDaysAgo(new Date(), -1);

class ConstraintInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: tomorrow,
            constraint: Constants.CONSTRAINT.GREATER_THAN,
            disableAdd: false
        }
    }

    onConstraintSelect(option) {
        console.log(option);
        let date = null;
        if(option.type === Constants.CONSTRAINT.GREATER_THAN) {
            date = tomorrow;
        }
        this.setState({constraint: option.type, date}, this.validateConstraint.bind(this));
    }

    onDateSelect(date) {
        console.log(date);
        this.setState({date}, this.validateConstraint.bind(this));
    }

    validateConstraint() {
        let disableAdd = true;
        if(dateUtils.isValidDate(this.state.date) && !!this.state.constraint) {
            disableAdd = false;
        }
        this.setState({disableAdd});
    }

    onAddConstraint() {
        let constraint = {
            type: this.state.constraint,
            value: this.state.date.getTime()
        };
        this.props.actions.addConstraint(constraint);
    }

    render() {
        return (
            <div className="ConstraintInput">
                <div className="ConstraintInput-text">The day must</div>
                <SelectList onItemSelect={option => this.onConstraintSelect(option)}
                            options={[{
                                label: Constants.CONSTRAINT_LABEL.GREATER_THAN,
                                type: Constants.CONSTRAINT.GREATER_THAN
                            }, {
                                label: Constants.CONSTRAINT_LABEL.LESS_THAN,
                                type: Constants.CONSTRAINT.LESS_THAN
                            }, {
                                label: Constants.CONSTRAINT_LABEL.NOT_EQUAL,
                                type: Constants.CONSTRAINT.NOT_EQUAL
                            }]}/>
                <DatePicker value={this.state.date}
                            minDate={tomorrow}
                            onDateSelect={date => this.onDateSelect(date)}/>
                <AddActionButton action={() => this.onAddConstraint()}
                                 mini={true}
                                 disabled={this.state.disableAdd}
                                 backgroundColor={"rgba(0,0,0,0.5)"}/>
            </div>
        );
    }
}

ConstraintInput.propTypes = {};

function mapDispatchToProps(dispatch) {
    let {addConstraint} = constraintActions;
    const dispatchActions = bindActionCreators({addConstraint}, dispatch);
    return {
        dispatch,
        actions: dispatchActions
    }
}

export default connect(null, mapDispatchToProps)(ConstraintInput);