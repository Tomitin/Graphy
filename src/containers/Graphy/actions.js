import { ADD_NODE, ADD_EDGE, SELECT_NODE, CHANGE_COLOR } from './constants';

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

export const changeColor = (id, color) => {
    return {
        type: CHANGE_COLOR,
        payload: { 
            id,
            color 
        }
    }
}