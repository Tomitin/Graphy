import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = (props) => {
    return (
        <FontAwesomeIcon icon={props.iconName} /> 
    );
}

export default Icon;