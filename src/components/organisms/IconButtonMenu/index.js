import React from 'react';
import Input from 'components/atoms/Input';
import IconButton from 'components/molecules/IconButton';
import { IconGroup, IconMenu, Wrapper } from './styled';

const IconButtonMenu = () => {


    return (
        <Wrapper>
            <IconGroup>
                <IconButton borderRadius='50%' iconName='save'></IconButton>
                <IconButton borderRadius='50%' iconName='file-upload'></IconButton>
                <IconButton borderRadius='50%' iconName='question'></IconButton>
                <IconButton borderRadius='50%' iconName='trash'></IconButton>
            </IconGroup>
            <IconMenu>
                
                <Input type='file' />
            </IconMenu>
        </Wrapper>
    );
}

export default IconButtonMenu;