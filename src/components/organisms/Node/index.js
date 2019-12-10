import React from 'react';
import { Node as NodeShape } from './styled';

const Node = (props) => {

    return (
        <NodeShape>
            {props.title && props.title}
        </NodeShape>
    );
}

export default Node;