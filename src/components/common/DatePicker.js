import React, {Component, PropTypes} from 'react';
import DatePickerMaterial from 'material-ui/DatePicker';

class DatePicker extends Component {

    render() {
        return (
            <div>
                <DatePickerMaterial hintText="Date"
                                    container="inline"
                                    minDate={this.props.minDate}
                                    autoOk={true}
                                    defaultDate={this.props.defaultDate}
                                    value={this.props.value}
                                    onChange={(event, date) => this.props.onDateSelect(date)}/>
            </div>
        );
    }
}
DatePicker.propTypes = {
    value: PropTypes.object,
    defaultDate: PropTypes.object,
    minDate: PropTypes.object,
    onDateSelect: PropTypes.func
};

export default DatePicker;