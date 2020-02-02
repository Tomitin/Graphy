import styled, { keyframes, css } from 'styled-components';

const fill = degreeNumber => keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(${degreeNumber}deg);
    }
`;

export const CircleWrapper = styled.div`
    position: relative;
    width: ${props => props.size? props.size : '150px'};
    height: ${props => props.size? props.size : '150px'};
    border-radius: 50%;
    background: #e6e2e7;
`;

export const Mask = styled.div`
    width: 100.5%;
    height: 100.5%;
    border-radius: 50%;
    position: absolute;
    clip-path: inset(0 0 0 50%);
    ${props => props.full && css`
    animation: ${props => props.rotation? fill(props.rotation): fill('180')} ease-out ${props => props.time? props.time: '3'}s;
    transform: rotate(${props => props.rotation? props.rotation: '180'}deg);
    `}
`;

export const CircleFill = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #9e00b1;
    clip-path: inset(0 50% 0 0);
    animation: ${props => props.rotation? fill(props.rotation): fill('180')} ease-out ${props => props.time? props.time: '3'}s;
    transform: rotate(${props => props.rotation? props.rotation: '180'}deg);
`;

export const InsideCircle = styled.div`
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background: #fff;
`;

export const TextInsideCircle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
