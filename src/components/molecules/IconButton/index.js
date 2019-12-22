import React from 'react';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';

const IconButton = (props) => {

    return (
            <Button padding={'9px 7px'}><Icon iconName={props.iconName}></Icon></Button>
    );
}

export default IconButton;