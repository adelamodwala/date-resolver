import React from 'react';

import Button from 'material-ui/RaisedButton';

const ToolButton = ({label, action, style, backgroundColor}) => (
    <div>
        <Button label={label}
                onClick={() => action()}
                backgroundColor={backgroundColor}
                style={style}/>
    </div>
);

export default ToolButton;