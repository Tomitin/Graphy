import React from 'react';
import { Button as StyledButton } from './styled';

const Button = (props) => {

    return (
        <StyledButton padding={props.padding}>{props.children}</StyledButton>
    );
}

export default Button;