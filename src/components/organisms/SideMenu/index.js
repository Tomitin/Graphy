import React, { useState } from 'react';
import Textarea from 'components/atoms/Textarea';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import { Label } from 'components/atoms/Label';
import { StyledSideMenu, ButtonGroup } from './styled';
import { useInputChange } from 'components/customHooks';

const SideMenu = ({ handleFormSubmit, title, description }) => {
    const [input, handleInputChange] = useInputChange();
 
    return (
        <>
            <StyledSideMenu>
                <Label>{title}</Label><br />
                <Label>{description}</Label>
                <form onSubmit={event => handleFormSubmit(event, input)}>
                    <Label>Write a title</Label>
                    <Input name="title" onChange={handleInputChange} />
                    <Label>Write a description</Label>
                    <Textarea name="description" onChange={handleInputChange} />
                    <ButtonGroup>
                        <Button>Save</Button>
                    </ButtonGroup>
                </form>
            </StyledSideMenu>
        </>
    );
}

export default SideMenu;
