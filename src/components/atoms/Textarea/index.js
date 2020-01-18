import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';

const styles = css`
    display: block;
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    background-color: ${palette('grayscale', 0, true)};
    border: 1px solid ${ifProp('invalid', palette('danger', 2), palette('grayscale', 3))};
`;

const StyledTextarea = styled.textarea`${styles}`;

const Textarea = props => {

    return (
        <>
            <StyledTextarea {...props} rows='4' cols='50' />
        </>
    );
}


Textarea.propTypes = {
    placeholder: PropTypes.string,
}

Textarea.defaultProps = {
    placeholder: 'Write a description...'
}

export default Textarea;