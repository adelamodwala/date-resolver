import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as constraintActions from '../../reducers/constraints/constraintsActions';

import ToolButton from '../common/ToolButton';

class ResetForm extends Component {

    render() {
        return (
            <div>
                Hey
                <ToolButton label="RESET" action={() => this.props.resetConstraints()} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    let { resetConstraints } = constraintActions;
    const dispatchActions = bindActionCreators({ resetConstraints }, dispatch);
    return {
        dispatch,
        actions: dispatchActions
    }
}

export default connect(null, mapDispatchToProps)(ResetForm);