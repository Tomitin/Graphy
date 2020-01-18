import React from 'react';
import IconButton from '.';

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