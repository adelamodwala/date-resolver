import React, {Component, PropTypes} from 'react';
import Calendar from 'material-ui/DatePicker/Calendar';

import * as dateUtils from '../../lib/dateUtils';
import {WEEKDAY} from '../../lib/constants';

const WEEKDAY_MAP = [
    WEEKDAY.SUNDAY,
    WEEKDAY.MONDAY,
    WEEKDAY.TUESDAY,
    WEEKDAY.WEDNESDAY,
    WEEKDAY.THURSDAY,
    WEEKDAY.FRIDAY,
    WEEKDAY.SATURDAY
];

class ResultCalendar extends Component {

    constructor(props) {
        super(props);
        let {min, max} = props.resultSet;

        this.state = {
            minDate: !!min ? new Date(min) : null,
            maxDate: !!max ? new Date(max) : null,

        };
    }

    componentWillReceiveProps(nextProps) {
        let {min, max} = nextProps.resultSet;
        this.setState({
            minDate: !!min ? new Date(min) : null,
            maxDate: !!max ? new Date(max) : null
        });
    }

    disableDate(date) {
        let dateTime = dateUtils.getBeginningOfDay(date).getTime();
        let {neverEqual} = this.props.resultSet;

        return this.props.resultSet.blocked.indexOf(dateTime) > -1
            || neverEqual.has(WEEKDAY_MAP[date.getDay()]);
    }

    render () {
        return (
            <div style={{marginTop: 10, marginBottom: 10}}>
                <Calendar mode="landscape"
                          disabled={false}
                          minDate={this.state.minDate}
                          maxDate={this.state.maxDate}
                          initialDate={this.state.minDate}
                          shouldDisableDate={this.disableDate.bind(this)}
                          firstDayOfWeek={1}/>
                <div style={{clear: 'both'}}></div>
            </div>
        );
    }
}
ResultCalendar.propTypes = {
    resultSet: PropTypes.shape({
        resolved: PropTypes.bool,
        min: PropTypes.number,
        max: PropTypes.number,
        blocked: PropTypes.arrayOf(PropTypes.number),
        neverEqual: PropTypes.object
    })
};

export default ResultCalendar;