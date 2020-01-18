import styled from 'styled-components';
import { palette } from 'styled-theme';

const backgroundIconMenu = palette('primary', 1, true);

export const IconMenu = styled.div`
    position: relative;
    background: #00bfb6;
    width:100%;
`;

export const Wrapper = styled.div`
    position: absolute;
`;

export const IconGroup = styled.div`
    position: relative;
    display: table;
    text-align: center;
    background: ${backgroundIconMenu};
`;