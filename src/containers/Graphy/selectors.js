import { createSelector } from 'reselect';

const nodesIdsSelector = state => state.graphReducer.nodes.allIds;
const nodesByIdSelector = state => state.graphReducer.nodes.byIds;
const selectedNodeSelector = state => state.graphReducer.nodes.selectedNode;
const edgesIdsSelector = state => state.graphReducer.edges.allIds;
const edgesByIdSelector = state => state.graphReducer.edges.byIds;
const edgesSelector = state => state.graphReducer.edges;
const nodesSelector = state => state.graphReducer.nodes;
const graphSelector = state => state.graphReducer;

export const allNodesSelector = createSelector(
    nodesIdsSelector,
    allIds => allIds
);

export const getGraphSelector = createSelector(
    graphSelector,
    graph => graph
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
    edgesSelector,
    edges => {
        const allEdges = edges.allIds.map(id => {
            return edges.byIds[id]
        });
        return allEdges;
    }
)

export const arrayNodesSelector = createSelector(
    nodesSelector,
    nodes => {
        const allNodes = nodes.allIds.map(id => {
            return nodes.byIds[id]
        });
        return allNodes;
    }
)