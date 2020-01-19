import { 
    ADD_NODE, 
    ADD_EDGE, 
    SELECT_NODE, 
    CHANGE_COLOR, 
    NODES, 
    EDGES, 
    ADD_GRAPH, 
    RESTART_GRAPH, 
    UPDATE_NODE,
    NODE_SIZE,
    INCREMENT_NODE_SIZE,
    DECREASE_NODE_SIZE,
} from "./constants";

const initialState = {
    [NODES]: {
        selectedNode: null,
        byIds: {},
        allIds: [],
        config: {
            size: NODE_SIZE,
        }
    },
    [EDGES]: {
        selectedEdge: null,
        byIds: {},
        allIds: []
    }
}
const graphReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_GRAPH: {
            return action.payload;
        }
        case RESTART_GRAPH: {
            return initialState;
        }
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
            const id = action.payload;
            return {
                ...state,
                [NODES]: {
                    ...state[NODES],
                    selectedNode: id
                }
            }
        }
        case UPDATE_NODE: {
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
                    }
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
        case INCREMENT_NODE_SIZE: {
            return {
                ...state,
                [NODES]: {
                    ...state[NODES],
                    config: {
                        ...state[NODES].config,
                        size: state[NODES].config.size + 1.5
                    }
                }
            }
        }
        case DECREASE_NODE_SIZE: {
            return {
                ...state,
                [NODES]: {
                    ...state[NODES],
                    config: {
                        ...state[NODES].config,
                        size: state[NODES].config.size - 1.5
                    }
                }
            }
        }
        default:
            return state;
    }
}

export default graphReducer;