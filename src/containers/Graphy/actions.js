import { ADD_NODE, ADD_EDGE, SELECT_NODE, CHANGE_COLOR, ADD_GRAPH, RESTART_GRAPH, UPDATE_NODE } from './constants';

export const addNode = node => {
    return {
        type: ADD_NODE,
        payload: node
    }
}

export const addEdge = edge => {
    return {
        type: ADD_EDGE,
        payload: edge
    }
}

export const selectNode = id => {
    return {
        type: SELECT_NODE,
        payload: id
    }
}

export const updateNode = node => {
    return {
        type: UPDATE_NODE,
        payload: node
    }
}

export const changeColor = (id, color) => {
    return {
        type: CHANGE_COLOR,
        payload: { 
            id,
            color 
        }
    }
}

export const addGraph = graph => {
    return {
        type: ADD_GRAPH,
        payload: graph
    }
}

export const restartGraph = () => {
    return {
        type: RESTART_GRAPH
    }
}