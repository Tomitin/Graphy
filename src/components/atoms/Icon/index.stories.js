import React from 'react';
import Icon from '.';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCheckSquare, faCoffee);

export default {
    component: Icon,
    title: 'Icon',
}

export const Default = () => <Icon iconName='coffee'/>