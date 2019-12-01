import React from 'react';
import { Label } from '.';

export default {
    component: Label,
    title: 'Label'
}

export const defaulti = () => <Label>Hello</Label>;

export const reverse = () => (
  <Label reverse>
    Hello
  </Label>
);
