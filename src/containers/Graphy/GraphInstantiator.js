import { makeHashId } from 'containers/utils';
import { DEFAULT_COLOR } from './constants'

// convert to interface and make a generic class for both edges and nodes
export class NodeInstantiator {
    constructor(id, position, color = DEFAULT_COLOR) {
        this.position = position;
        this.id = makeHashId(`node${id}`);
        this.color = color;
        this.node = { 
            id: this.id.toString(),
            title: `Node${id}`,
            description: '',
            pos: {
                x: this.position.x,
                y: this.position.y
            }, 
            color: this.color
        };
    }
    
    getNode = () => {
        return this.node;
    }
}

export class EdgeInstantiator {
    constructor(id, source, target, color = DEFAULT_COLOR) {
        this.id = makeHashId(`edge${id}`);
        this.source = source;
        this.target = target;
        this.color = color;
        this.edge = {
            id: this.id.toString(),
            source: this.source,
            target: this.target,
            color: this.color
        }
    }

    getEdge = () => {
        return this.edge;
    } 
}