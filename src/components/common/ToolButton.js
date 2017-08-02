import React from 'react';

import Button from 'material-ui/RaisedButton';

const ToolButton = ({label, action}) => (
    <div>
        <Button label={label} onClick={() => action()}/>
    </div>
);

export default ToolButton;