import { createSelector } from 'reselect';

const nodesIdsSelector = state => state.graphReducer.nodes.allIds;
const nodesByIdSelector = state => state.graphReducer.nodes.byIds;
const selectedNodeSelector = state => state.graphReducer.nodes.selectedNode;
const edgesIdsSelector = state => state.graphReducer.edges.allIds;
const edgesByIdSelector = state => state.graphReducer.edges.byIds;
const edges = state => state.graphReducer.edges;
const nodes = state => state.graphReducer.nodes;

export const allNodesSelector = createSelector(
    nodesIdsSelector,
    allIds => allIds
);

export const getSelectedNode = createSelector(
    selectedNodeSelector,
    selectedNode => selectedNode
);

export const allEdgesSelector = createSelector(
    edgesIdsSelector,
    allIds => allIds
);

export const nodeByIdSelector = createSelector(
    nodesByIdSelector,
    byIds => byIds
);

export const edgeByIdSelector = createSelector(
    edgesByIdSelector,
    byIds => byIds
)

export const arrayEdgesSelector = createSelector(
    edges,
    edges => {
        const allEdges = edges.allIds.map(id => {
            return edges.byIds[id]
        });
        return allEdges;
    }
)

export const arrayNodesSelector = createSelector(
    nodes,
    nodes => {
        const allNodes = nodes.allIds.map(id => {
            return nodes.byIds[id]
        });
        return allNodes;
    }
)