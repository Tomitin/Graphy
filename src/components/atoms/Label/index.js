import { font, palette } from 'styled-theme';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Label = styled.label`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 1)};
  font-size: ${props => props.fontSize};
`;

Label.defaultProps = {
  fontSize: '1rem'
}

Label.propTypes = {
  fontSize: PropTypes.string
}