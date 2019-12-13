import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { font, palette } from 'styled-theme'

const fontSize = ({ height }) => `${height / 35.555556}rem`;

const styles = css`
  font-family: ${font('primary')};
  display: block;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  font-size: ${fontSize};
  color: ${palette('grayscale', 0)};
  background-color: ${palette('grayscale', 0, true)};
  border: 1px solid ${ifProp('invalid', palette('danger', 2), palette('grayscale', 3))};
  border-radius: 2px;
`

const StyledInput = styled.input`${styles}`;

const Input = (props) => {
    return <StyledInput {...props} />
}

Input.propTypes = {
    type: PropTypes.string,
    height: PropTypes.number,
    invalid: PropTypes.bool,
}

Input.defaultProps = {
    type: 'text',
    height: '40',
}
export default Input;