import React, {Component, PropTypes} from 'react';

import {CONSTRAINT_LABEL, CONSTRAINT, WEEKDAY_LABEL} from "../../lib/constants"
import * as convert from '../../lib/convert';

const ConstraintView = ({constraint}) => (
    <div>
        {constraint.type === CONSTRAINT.NEVER_EQUAL ?
            <div>The day must {CONSTRAINT_LABEL[constraint.type]} {WEEKDAY_LABEL[constraint.value]}</div> :
            <div>The day must {CONSTRAINT_LABEL[constraint.type]} {convert.formatToReadableDateString(constraint.value)}</div>
        }
    </div>
);

class ConstraintsView extends Component {

    render () {
        return (
            <div style={{height: 100, overflowY: 'auto'}}>
                {this.props.constraints.map((constraint, idx) => <ConstraintView key={idx}
                                                                                 constraint={constraint}/>)}
            </div>
        );
    }
}
ConstraintsView.propTypes = {
    constraints: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        value: PropTypes.any
    }))
};

export default ConstraintsView;