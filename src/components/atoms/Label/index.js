import { font, palette } from 'styled-theme';
import styled from 'styled-components';

export const Label = styled.label`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 1)};
  font-size: 1rem;
  line-height: 2em;
`