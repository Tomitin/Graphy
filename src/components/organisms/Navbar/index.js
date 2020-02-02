import React from 'react';
import Button from 'components/atoms/Button';
import { Label } from 'components/atoms/Label';
import { StyledNavbar } from './styled';

const Navbar = () => {

    return (
        <StyledNavbar>
            <Label fontSize='1.7rem'>Graphy</Label>
                <Button>My drawings</Button>
        </StyledNavbar>
    );
}

export default Navbar;