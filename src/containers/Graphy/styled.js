import styled from 'styled-components';

export const GraphyCanvas = styled.canvas`
    width: 100%;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

export const IconGroupCanvas = styled.div`
    position: absolute;
    right: 0;
`;

export const GraphContainer = styled.div`
    position: relative;
    width: 1400px;
    height: 600px;
    border-color:grey;
    border-style: solid;
    border-width: 5px;
`;

export const SpeechBubble = styled.div`
    display: table;
    text-align: center;
    font-weight: 900;
    color: #fff;
    border: 1px solid #00bfb6;
    font-family: arial;
    position: relative;
    :before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 10px solid #00bfb6;
        border-right: 10px solid transparent;
        border-top: 10px solid #00bfb6;
        border-bottom: 10px solid transparent;
        left: 19px;
        bottom: -19px;
    }
`;