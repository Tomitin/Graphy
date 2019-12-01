import React from 'react';
import Input from '.';

export default {
    component: Input,
    title: 'Input',
}

export const Default = () => <Input />
export const textarea = () => <Input type="textarea" />
export const checkbox = () => <Input type="checkbox" />
export const radio = () => <Input type="radio" />
export const height = () => <Input height={100} />