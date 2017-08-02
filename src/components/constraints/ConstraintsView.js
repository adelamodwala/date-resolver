import React, {Component, PropTypes} from 'react';

import {CONSTRAINT_LABEL} from "../../lib/constants"
import * as convert from '../../lib/convert';

const ConstraintView = ({constraint}) => (
    <div>
        <div>The day must {CONSTRAINT_LABEL[constraint.type]} {convert.formatToReadableDateString(constraint.value)}</div>
    </div>
);

class ConstraintsView extends Component {

    render () {
        return (
            <div>
                {this.props.constraints.map((constraint, idx) => <ConstraintView key={idx}
                                                                                 constraint={constraint}/>)}
            </div>
        );
    }
}
ConstraintsView.propTypes = {
    constraints: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        value: PropTypes.number
    }))
};

export default ConstraintsView;