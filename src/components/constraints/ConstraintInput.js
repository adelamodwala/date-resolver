import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as constraintActions from '../../reducers/constraints/constraintsActions';
import * as Constants from '../../lib/constants';

import './ConstraintInput.css';

import SelectList from '../common/SelectList';
import DatePicker from "../common/DatePicker";
import * as dateUtils from "../../lib/dateUtils";
import ToolButton from "../common/ToolButton";

const tomorrow = dateUtils.getDateDaysAgo(new Date(), -1);

class ConstraintInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: tomorrow,
            constraint: Constants.CONSTRAINT.GREATER_THAN,
            disableAdd: false,
            neverEqual: Constants.WEEKDAY.MONDAY
        }
    }

    onConstraintSelect(option) {
        console.log(option);
        let date = null;
        if (option.type === Constants.CONSTRAINT.GREATER_THAN) {
            date = tomorrow;
        }
        this.setState({constraint: option.type, date}, this.validateConstraint.bind(this));
    }

    onNeverEqualSelect(option) {
        console.log(option);
        this.setState({
            date: null,
            neverEqual: option.type
        });
    }

    onDateSelect(date) {
        console.log(date);
        this.setState({date}, this.validateConstraint.bind(this));
    }

    validateConstraint() {
        let disableAdd = true;
        if ((dateUtils.isValidDate(this.state.date) && !!this.state.constraint)
            || this.state.constraint === Constants.CONSTRAINT.NEVER_EQUAL) {
            disableAdd = false;
        }
        this.setState({disableAdd});
    }

    onAddConstraint() {
        if(this.state.disableAdd) {
            return;
        }
        let constraint = {
            type: this.state.constraint,
            value: this.state.constraint === Constants.CONSTRAINT.NEVER_EQUAL ? this.state.neverEqual : this.state.date.getTime()
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
                            }, {
                                label: Constants.CONSTRAINT_LABEL.NEVER_EQUAL,
                                type: Constants.CONSTRAINT.NEVER_EQUAL
                            }]}/>
                {this.state.constraint === Constants.CONSTRAINT.NEVER_EQUAL ?
                    <SelectList onItemSelect={option => this.onNeverEqualSelect(option)}
                                options={[{
                                    label: Constants.WEEKDAY_LABEL.MONDAY,
                                    type: Constants.WEEKDAY.MONDAY
                                }, {
                                    label: Constants.WEEKDAY_LABEL.TUESDAY,
                                    type: Constants.WEEKDAY.TUESDAY
                                }, {
                                    label: Constants.WEEKDAY_LABEL.WEDNESDAY,
                                    type: Constants.WEEKDAY.WEDNESDAY
                                }, {
                                    label: Constants.WEEKDAY_LABEL.THURSDAY,
                                    type: Constants.WEEKDAY.THURSDAY
                                }, {
                                    label: Constants.WEEKDAY_LABEL.FRIDAY,
                                    type: Constants.WEEKDAY.FRIDAY
                                }, {
                                    label: Constants.WEEKDAY_LABEL.SATURDAY,
                                    type: Constants.WEEKDAY.SATURDAY
                                }, {
                                    label: Constants.WEEKDAY_LABEL.SUNDAY,
                                    type: Constants.WEEKDAY.SUNDAY
                                },]}/> :
                    <DatePicker value={this.state.date}
                                minDate={tomorrow}
                                onDateSelect={date => this.onDateSelect(date)}/>
                }
                <ToolButton label="ADD"
                            action={() => this.onAddConstraint()}
                            backgroundColor={'rgba(0,0,0,0.1)'}/>
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