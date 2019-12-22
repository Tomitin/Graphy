import React from 'react';
import IconButton from '.';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCheckSquare, faCoffee);

export default {
    component: IconButton,
    title: 'Icon Button',
}

export const Default = () => <IconButton iconName='coffee'/>

export const IconButtonGroup = () => (
    <div>
        <IconButton iconName='coffee'/>
        <IconButton iconName='coffee'/>
        <IconButton iconName='coffee'/>
        <IconButton iconName='coffee'/>
        <IconButton iconName='coffee'/>
    </div>
)