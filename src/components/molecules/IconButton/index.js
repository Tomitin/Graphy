import React from 'react';
import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import PropTypes from 'prop-types';

const IconButton = props => {
    return (
        <Button 
            borderRadius={props.borderRadius} 
            padding={props.padding}
            height={props.height}
            width={props.width}
            onClick={props.onClick}
        >
            <Icon iconName={props.iconName} />
        </Button>
    );
}


IconButton.defaultProps = {
    height: '40px',
    width: '40px',
    padding: '9px 7px',
}

IconButton.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
    padding: PropTypes.string,
};


export default IconButton;