import React, {Component, PropTypes} from 'react';
import DatePickerMaterial from 'material-ui/DatePicker';

class DatePicker extends Component {

    render() {
        return (
            <div>
                <DatePickerMaterial hintText="Date"
                                    container="inline"
                                    defaultDate={this.props.defaultDate}/>
            </div>
        );
    }
}
DatePicker.propTypes = {
    defaultDate: PropTypes.object
};

export default DatePicker;