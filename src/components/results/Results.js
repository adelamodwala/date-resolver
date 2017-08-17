import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as validators from '../../lib/validators';
import * as convert from '../../lib/convert';
import ResultCalendar from "./ResultCalendar";
import * as Constants from '../../lib/constants';

class Results extends Component {

    getBoundsMessage() {
        const {resultSet} = this.props;
        let message = '';
        if (!!resultSet.min && !!resultSet.max) {
            // Both min and max are defined
            if (resultSet.min === resultSet.max) {
                message += `${convert.formatToReadableDateString(resultSet.min)}`;
            }
            else {
                message += `Between ${convert.formatToReadableDateString(resultSet.min)} and ${convert.formatToReadableDateString(resultSet.max)}`;
            }

        }
        else if (!!resultSet.min) {
            // Max is not defined
            message += `After ${convert.formatToReadableDateString(resultSet.min)}`;
        }
        else if (!!resultSet.max) {
            // Min is not defined
            message += `Before ${convert.formatToReadableDateString(resultSet.max)}`;
        }

        return [message];
    }

    getBlockedDatesMessages() {
        const {resultSet} = this.props;
        let messages = [];
        if (validators.arrayIsNotEmpty(resultSet.blocked)) {
            resultSet.blocked.map(dateTime => {
                messages.push(`Not ${convert.formatToReadableDateString(dateTime)}`);
            })
        }

        return messages;
    }

    getNeverEqualDaysMessages() {
        const {neverEqual} = this.props.resultSet;
        let messages = [];
        if (neverEqual.size > 0) {
            neverEqual.forEach(day => {
                messages.push(`Never on a ${Constants.WEEKDAY_LABEL[day]}`);
            })
        }

        return messages;
    }

    getConstraintMessages() {
        let messages = [
            ...this.getBoundsMessage(),
            ...this.getBlockedDatesMessages(),
            ...this.getNeverEqualDaysMessages()
        ];
        let renderMessages = messages.map((message, idx) => <li key={idx}>{message}</li>);

        return renderMessages;
    }

    render() {
        const {resultSet} = this.props;
        if (validators.objectIsEmpty(resultSet)) {
            return null;
        }
        else if (!resultSet.resolved) {
            return <div>Your constraints did not resolve!</div>
        }

        let message = "You can pick a date that is:";
        return (
            <div>
                <div>
                    <ResultCalendar resultSet={this.props.resultSet}/>
                </div>
                <div>
                    {message}
                    <ul>
                        {this.getConstraintMessages()}
                    </ul>
                </div>
            </div>
        );
    }

}

Results.propTypes = {
    resultSet: PropTypes.shape({
        resolved: PropTypes.bool,
        min: PropTypes.number,
        max: PropTypes.number,
        blocked: PropTypes.arrayOf(PropTypes.number),
        neverEqual: PropTypes.object
    })
};

function mapStateToProps(state) {
    const {resultSet} = state.constraints;
    return {
        resultSet
    }
}

export default connect(mapStateToProps)(Results);