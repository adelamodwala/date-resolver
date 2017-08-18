import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ConstraintInput from "./ConstraintInput";
import ConstraintsView from "./ConstraintsView";

class ConstraintsForm extends Component {

    render() {
        return (
            <div className="ConstraintsForm">
                <div className="ConstraintsForm-container">
                    <ConstraintInput/>
                    <ConstraintsView constraints={this.props.constraints}/>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {constraints} = state.constraints;
    return {
        constraints
    }
}

export default connect(mapStateToProps)(ConstraintsForm);