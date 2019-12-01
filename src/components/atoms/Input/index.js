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
  padding: ${ifProp({ type: 'textarea' }, '0.4444444444em', '0 0.4444444444em')};
  height: ${ifProp({ type: 'textarea' }, 'auto', '2.2222222222em')};
  color: ${palette('grayscale', 0)};
  background-color: ${palette('grayscale', 0, true)};
  border: 1px solid ${ifProp('invalid', palette('danger', 2), palette('grayscale', 3))};
  border-radius: 2px;
  &[type=checkbox], &[type=radio] {
    display: inline-block;
    border: 0;
    border-radius: 0;
    width: auto;
    height: auto;
    margin: 0 0.2rem 0 0;
  }
`

const StyledTextArea = styled.textarea`${styles}`;
const StyledInput = styled.input`${styles}`;

const Input = (props) => {
    const { type } = props;
    if(type === 'textarea'){
        return <StyledTextArea {...props}/>
    }
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