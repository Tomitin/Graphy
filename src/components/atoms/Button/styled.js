import styled from 'styled-components';
import { palette } from 'styled-theme';

const colorButton = palette('primary', 2, true);
const colorButtonHover = palette('primary', 3, true);
const colorButtonClick = palette('primary', 4, true);

export const Button = styled.button`
    background-color: ${colorButton};
    border:  none;
    color: white;
    text-align: center;
    border-radius: ${props => props.borderRadius};
    padding: ${props => props.padding};
    height: ${props => props.height};
    width: ${props => props.width};
    cursor: pointer;
    font-size: 16px;
    :hover {
        background-color: ${colorButtonHover};
    }
    :active {
        background-color: ${colorButtonClick};
    }
`;