import React from 'react';
import IconButton from 'components/molecules/IconButton';
import { ModalContainer, MainModal, Title, HeaderModal, RightContent } from './styled';

const Modal = props => {

    return (
        <ModalContainer onClick={props.handleClose} show={props.show} >
            <MainModal onClick={event => event.stopPropagation()}>
                <HeaderModal>
                    <Title>{props.title}</Title>
                    <RightContent>
                        <IconButton height={'35px'} iconName={'times'} onClick={props.handleClose}/>
                    </RightContent>
                </HeaderModal>
                    {props.title && <hr />}
                {props.children}
            </MainModal>
        </ModalContainer>
    );
}

export default Modal;