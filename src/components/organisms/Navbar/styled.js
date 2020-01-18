import styled from 'styled-components';

export const StyledNavbar = styled.ul`
    overflow: hidden;
    margin: 0;
    padding-top: 3px;
    padding-bottom: 3px;
    list-style-type: none;
    background-color: ${props => props.theme.colors? props.theme.colors.main : '#E84549'};
`;

export const RightAlign = styled.li`
    padding: 0 5px 0 5px;
    float: right;
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
`;