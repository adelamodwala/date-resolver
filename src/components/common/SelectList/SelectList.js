import React, {Component, PropTypes} from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class SelectList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    onItemSelect(event, index, value) {
        this.setState({
            value: value
        });
        this.props.onItemSelect(this.props.options[value]);
    }

    renderOptions() {
        let renderViews = [];
        this.props.options.map((option, idx) => {
            renderViews.push(
                <MenuItem key={idx}
                          value={idx}
                          primaryText={option.label}/>
            );
        });

        return renderViews;
    }

    render() {
        return (
            <div>
                <DropDownMenu value={this.state.value} onChange={this.onItemSelect.bind(this)}>
                    {this.renderOptions()}
                </DropDownMenu>
            </div>
        );
    }
}

SelectList.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })),
    onItemSelect: PropTypes.func
};

export default SelectList;