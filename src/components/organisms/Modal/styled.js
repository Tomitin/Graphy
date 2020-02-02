import styled from 'styled-components';

export const ModalContainer = styled.div`
    display: ${props => props.show? 'block' : 'none'};
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
`;

export const Title = styled.h2`
    display: inline-block;
    width:80%;
    margin: 0;
    font-weight: 900;
`;

export const HeaderModal = styled.header`
    
`;

export const RightContent = styled.span`
    float: right;
`;

export const MainModal = styled.section`
    position: fixed;
    z-index: 10000;
    background: white;
    width:600px;
    max-width:100%;

    height:400px;
    max-height:100%;

    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 10px;
`;