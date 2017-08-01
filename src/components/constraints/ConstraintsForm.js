import React, {Component, PropTypes} from 'react';
import ConstraintInput from "./ConstraintInput";

export default class ConstraintsForm extends Component {

    render() {
        return (
            <div className="ConstraintsForm">
                <div className="ConstraintsForm-container">
                    <ConstraintInput/>
                </div>
            </div>
        );
    }

}