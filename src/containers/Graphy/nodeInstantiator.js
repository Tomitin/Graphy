import React from 'react';
import { makeHashId } from './utils';

class NodeInstantiator {
    constructor(position, id) {
        this.position = position;
        this.id = id;
    }
    
    getNode = () => {
        const nodeId = makeHashId(`node${this.id}`);
        const node = { id: nodeId.toString(), pos:{x: this.position.x, y: this.position.y} };
        return node;
    }
}

export default NodeInstantiator;