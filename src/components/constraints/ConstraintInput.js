import React, {Component, PropTypes} from 'react';

import './ConstraintInput.css';

import SelectList from '../common/SelectList';

export default class ConstraintInput extends Component {

    onConstraintSelect(option) {
        console.log(option);
    }

    render() {
        return (
            <div className="ConstraintInput">
                <div className="ConstraintInput-text">The day must</div>
                <SelectList onItemSelect={option => this.onConstraintSelect(option)}
                            options={[{
                                label: 'Be After',
                                type: 'GREATER_THAN'
                            }, {
                                label: 'Be Before',
                                type: 'LESS_THAN'
                            }]}/>
            </div>
        );
    }
}