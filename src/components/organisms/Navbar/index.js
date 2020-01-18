import React from 'react';
import Button from 'components/atoms/Button';
import IconButton from 'components/molecules/IconButton';
import { Label } from 'components/atoms/Label';
import { StyledNavbar, RightAlign } from './styled';

const Navbar = () => {
    // make button to erase all graph data??????????????????????
    const handleOnClick = () => {}


    return (
        <StyledNavbar>
            <Label fontSize='1.7rem'>Graphy</Label>
                <Button>My drawings</Button>
        </StyledNavbar>
    );
}

export default Navbar;