import React from 'react';
import { Button as StyledButton } from './styled';
import PropTypes from 'prop-types';

const Button = props => {
    return (
        <StyledButton {...props}>
            {props.children}
        </StyledButton>
    );
}

Button.defaultProps = {
    height: '100%',
    borderRadius: '0px',
    padding: '12px 24px',
}

Button.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    borderRadius: PropTypes.string,
    padding: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]).isRequired,
};

export default Button;