import styled from 'styled-components';

export const GraphyCanvas = styled.canvas`
    position: absolute;
    top: 20%;
    left: 10%;
    width: 1200px;
    height: 400px;

    border-color:grey;
    border-style: solid;
    border-width: 5px;
`;

export const SpeechBubble = styled.div`
    background: #00bfb6;
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