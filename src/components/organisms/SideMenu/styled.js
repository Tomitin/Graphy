import styled from 'styled-components';

export const StyledSideMenu = styled.aside`
    display:flex;
    padding: 20px;
    height: 100%;
    background-color: ${props => props.theme.colors? props.theme.colors.main : '#E84549'};
`;