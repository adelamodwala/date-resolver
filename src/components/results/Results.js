import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as validators from '../../lib/validators';
import * as convert from '../../lib/convert';

class Results extends Component {

    render() {
        const {resultSet} = this.props;
        if(validators.objectIsEmpty(resultSet)) {
            return null;
        }
        else if(!resultSet.resolved) {
            return <div>Your constraints did not resolve!</div>
        }

        let rangeMessage = "You can pick a date that is ";
        if(!!resultSet.min && !!resultSet.max) {
            // Both min and max are defined
            if(resultSet.min === resultSet.max) {
                rangeMessage += `${convert.formatToReadableDateString(resultSet.min)}`;
            }
            else {
                rangeMessage += `between ${convert.formatToReadableDateString(resultSet.min)} and ${convert.formatToReadableDateString(resultSet.max)}`;
            }

        }
        else if(!!resultSet.min) {
            // Max is not defined
            rangeMessage += `after ${convert.formatToReadableDateString(resultSet.min)}`;
        }
        else if(!!resultSet.max) {
            // Min is not defined
            rangeMessage += `before ${convert.formatToReadableDateString(resultSet.max)}`;
        }
        return (
            <div>
                {rangeMessage}
            </div>
        );
    }

}
Results.propTypes = {
    resultSet: PropTypes.shape({
        resolved: PropTypes.bool,
        min: PropTypes.number,
        max: PropTypes.number
    })
};

function mapStateToProps(state) {
    const {resultSet} = state.constraints;
    return {
        resultSet
    }
}

export default connect(mapStateToProps)(Results);