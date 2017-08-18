import React from 'react';

import Button from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const AddActionButton = ({action, mini, backgroundColor, disabled}) => (
    <div>
        <Button onTouchTap={(event) => action(event)}
                mini={mini}
                disabled={disabled}
                backgroundColor={backgroundColor}>
            <ContentAdd />
        </Button>
    </div>
);

export default AddActionButton;