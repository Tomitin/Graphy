export class NodeSource {
    constructor(node = {}) {
        if(!!NodeSource.instance) {
            return NodeSource.instance;
        }
        NodeSource.instance = this;
        this.node = node;
        return this;
    }

    getNode() {
        return this.node;
    }

    destroy() {
        NodeSource.instance = null;
    }
}

export class SelectedNode {
    constructor(node = {}) {
        if(!!SelectedNode.instance) {
            return NodeSource.instance;
        }
        SelectedNode.instance = this;
        this.node = node;
        return this;
    }

    getNode() {
        return this.node;
    }

    destroy() {
        SelectedNode.instance = null;
    }
}