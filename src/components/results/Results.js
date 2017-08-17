import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as validators from '../../lib/validators';
import * as convert from '../../lib/convert';

class Results extends Component {

    getBoundsMessage() {
        const { resultSet } = this.props;
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
        const { resultSet } = this.props;
        let messages = [];
        if(validators.arrayIsNotEmpty(resultSet.blocked)) {
            resultSet.blocked.map(dateTime => {
                messages.push(`Not ${convert.formatToReadableDateString(dateTime)}`);
            })
        }

        return messages;
    }

    getConstraintMessages() {
        let messages = [
            ...this.getBoundsMessage(),
            ...this.getBlockedDatesMessages()
        ];
        let renderMessages = messages.map((message, idx) => <li key={idx}>{message}</li>);

        return renderMessages;
    }

    render() {
        const { resultSet } = this.props;
        if (validators.objectIsEmpty(resultSet)) {
            return null;
        }
        else if (!resultSet.resolved) {
            return <div>Your constraints did not resolve!</div>
        }

        let message = "You can pick a date that is:";
        return (
            <div>
                {message}
                <ul>
                    {this.getConstraintMessages()}
                </ul>
            </div>
        );
    }

}
Results.propTypes = {
    resultSet: PropTypes.shape({
        resolved: PropTypes.bool,
        min: PropTypes.number,
        max: PropTypes.number,
        blocked: PropTypes.arrayOf(PropTypes.number)
    })
};

function mapStateToProps(state) {
    const { resultSet } = state.constraints;
    return {
        resultSet
    }
}

export default connect(mapStateToProps)(Results);