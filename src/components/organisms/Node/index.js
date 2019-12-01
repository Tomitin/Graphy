import React from 'react';
import { Node as NodeShape } from './styled';

const Node = (props) => {
    return (
        <NodeShape>
            {props.children}
        </NodeShape>
    );
}

export default Node;