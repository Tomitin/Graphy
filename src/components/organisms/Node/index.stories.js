
import React from 'react';
import Node from '.';
import { action } from '@storybook/addon-actions';

export default {
    component: Node,
    title: 'Node'
}

export const text = () => <Node onClick={action('clicked')}>Hello Button</Node>;

export const emoji = () => (
  <Node onClick={action('clicked')}>
    f😀 😎 👍 💯
  </Node>
);
