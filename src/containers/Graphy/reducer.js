import { ADD_NODE, ADD_EDGE, SELECT_NODE, CHANGE_COLOR, NODES, EDGES } from "./constants";

const initialState = {
    [NODES]: {
        selectedNode: null,
        byIds: {},
        allIds: []
    },
    [EDGES]: {
        selectedEdge: null,
        byIds: {},
        allIds: []
    }
}
const graphReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_NODE: {
            const { id } = action.payload;
            return {
                ...state,
                [NODES]: {
                    ...state[NODES],
                    byIds: {
                        ...state[NODES].byIds,
                        [id]: {
                            ...action.payload
                        }
                    },
                    allIds: [...state[NODES].allIds, id],
                }
            }
        }
        case SELECT_NODE: {
            // maybe selectednode could be changed to selected and make it more general so I can use it with edges aswell 
            const id = action.payload;
            return {
                ...state,
                [NODES]: {
                    ...state[NODES],
                    selectedNode: id
                }
            }
        }
        case ADD_EDGE: {
            const { id } = action.payload;
            return {
                ...state,
                [EDGES]: {
                    byIds: {
                        ...state[EDGES].byIds,
                        [id]: {
                            ...action.payload
                        }
                    },
                    allIds: [...state[EDGES].allIds, id]
                }
            }
        }
        case CHANGE_COLOR: {
            const { id, color } = action.payload;
            return {
                ...state,
                [NODES]: {
                    ...state[NODES],
                    byIds: {
                        ...state[NODES].byIds,
                        [id]: {
                            ...state[NODES].byIds[id],
                            color
                        }
                    }
                }
            }
        }
        default:
            return state;
    }
}

export default graphReducer;