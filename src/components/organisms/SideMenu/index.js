import React from 'react';
import { StyledSideMenu } from './styled';

const SideMenu = props => {
    return (
        <>
            <StyledSideMenu>
                {props.children}
            </StyledSideMenu>
        </>
    );
}

export default SideMenu;
