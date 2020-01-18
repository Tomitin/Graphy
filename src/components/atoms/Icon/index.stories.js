import React from 'react';
import Icon from '.';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee, faQuestion, faTrash, faSave, faFileUpload } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCheckSquare, faCoffee, faQuestion, faTrash, faSave, faFileUpload);

export default {
    component: Icon,
    title: 'Icon',
}

export const Default = () => <Icon iconName='coffee'/>