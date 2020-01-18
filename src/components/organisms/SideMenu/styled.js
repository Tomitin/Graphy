import styled from 'styled-components';

export const StyledSideMenu = styled.div`
    position: absolute;
    z-index: 9999;
    right: 0;
    top: 30%;
    padding: 20px;
    background-color: ${props => props.theme.colors? props.theme.colors.main : '#E84549'};
    max-width: 300px;
`;

export const ButtonGroup = styled.div`
    padding-top: 10px;
    overflow: hidden;
    padding-left: 100px;
    box-sizing: border-box;
`;