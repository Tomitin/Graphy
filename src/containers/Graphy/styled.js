import styled from 'styled-components';

export const GraphyCanvas = styled.canvas`
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: ${props => props.mousePointer && props.mousePointer };
`;

export const IconGroupCanvas = styled.div`
    position: absolute;
    right: 0;
`;

export const AppContainer = styled.div`
    display: flex;
    height:600px;
`;

export const GraphContainer = styled.div`
    flex:5;
    height:100%;
    position: relative;
    overflow:hidden;
    border-color: grey;
    border-style: solid;
    border-width: 5px;
`;

export const ProgressContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;