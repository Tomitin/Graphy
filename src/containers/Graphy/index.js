import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SELECTED_COLOR, NODE_SIZE, NODES, DEFAULT_COLOR } from "./constants";
import { NodeInstantiator, EdgeInstantiator } from './GraphInstantiator';
import FileUploadIcon from 'components/molecules/FileUploadIcon';
import IconButton from 'components/molecules/IconButton';
import Navbar from 'components/organisms/Navbar';
import SideMenu from 'components/organisms/SideMenu';
import { distance } from 'containers/utils';
import { GraphyCanvas, IconGroupCanvas, GraphContainer } from './styled';
import { NodeSource } from './singletons';
import { 
    addNode,
    addEdge, 
    selectNode, 
    changeColor, 
    restartGraph, 
    addGraph, 
    updateNode 
} from './actions';
import { 
    nodeByIdSelector, 
    arrayEdgesSelector, 
    arrayNodesSelector, 
    getSelectedNode, 
    getGraphSelector, 
    allEdgesSelector, 
    allNodesSelector 
} from './selectors';

const Graphy = () => {
    // container data
    const [nodeSource, setNodeSource] = useState({});
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mousePressed, setMousePressed] = useState(false);
    const dispatch = useDispatch();
    const canvasEl = useRef(null);
    //icon button group
    const saveIconLink = useRef(null);
    // drawing variables
    const [isLinkingNodes, setIsLinkingNodes] = useState(false);
    // redux data
    const nodeId = useSelector(state => allNodesSelector(state)).length;
    const edgeId = useSelector(state => allEdgesSelector(state)).length;
    const graph = useSelector(state => getGraphSelector(state));
    const getNodeById = useSelector(state => nodeByIdSelector(state));
    const edges = useSelector(state => arrayEdgesSelector(state));
    const nodes = useSelector(state => arrayNodesSelector(state));
    const selectedNodeId = useSelector(state => getSelectedNode(state));

    useEffect(() => {
        const canvas = canvasEl.current;
        canvas.setAttribute('height', '600px');
        canvas.setAttribute('width', '1400px');
    }, []);

    /* ==================================================== Events ================================================================ */

    const handleFormSubmit = (event, inputs) => {
        event.preventDefault();
        //modify actual node with the inputs values
        const modifiedNode = { ...getNodeById[selectedNodeId], ...inputs }
        //update the node state in redux store
        dispatch(updateNode(modifiedNode));
    }

    const handleSaveClick = event => {
        // Get graph reducer in store and convert it to json file 
        const graphJson = JSON.stringify(graph);
        // Convert json into a downloable file
        const blob = new Blob([graphJson], {type: 'application/json'});
        const url = URL.createObjectURL(blob);

        saveIconLink.current.href = url;    
        saveIconLink.current.download = "Graph.json";
        saveIconLink.current.type = "application/json";
    }

    const handleUploadClick = event => {
        if(!event.target.files[0]) return;
        clearCanvas();
        dispatch(restartGraph());
        //from all the files the user selected, pick the first one
        const files = event.target.files
        const file = files[0];
        
        const fileReader = new FileReader();
        // 2.When it finishes to read the file, execute the function to get the data
        fileReader.onload = (() => event => {
            const json = event.target.result;
            const parsedGraph = JSON.parse(json);
            dispatch(addGraph(parsedGraph))
        })();
        // 1.Read the file
        fileReader.readAsText(file);
    }

    const handleEraseClick = event => {
        clearCanvas();
        dispatch(restartGraph());
    }

    const handleClick = event => {
        const node = getNodeByDistance();
        if (!node) return;
        //actual node to DEFAULT COLOR
        if (selectedNodeId != null) dispatch(changeColor(selectedNodeId, DEFAULT_COLOR))
        dispatch(selectNode(node.id))
        //not actual node to SELECTED_COLOR
        const nodeColor = SELECTED_COLOR;
        const nodeId = node.id;
        dispatch(changeColor(nodeId, nodeColor));
    }

    const handleDoubleClick = event => {
        createNode(event);
        const canvas = canvasEl.current;
        canvas.style.cursor = 'pointer';
    }

    const handleClickHold = event => {
        setMousePressed(true);
    }

    const handleMouseUp = event => {
        setMousePressed(false);
        if (isLinkingNodes) {
            const nodeTarget = getNodeByDistance();
            connectNodes(nodeSource.getNode(), nodeTarget);
            // Reset canvas for redrawing
            setIsLinkingNodes(false);
            nodeSource.destroy();
            clearCanvas();
        }
    }

    const handleMouseMove = mouse => {
        const canvas = canvasEl.current;
        const context = getContext2d();

        const canvasPos = getLocalCanvasAxis(canvas);
        const mousePosInCanvas = getMousePositionInCanvas(mouse, canvasPos);
        let isMouseInsideNode = false;

        //Display cursor poitner when mouse is inside node
        setMousePos(mousePosInCanvas);
        const node = getNodeByDistance();
        node ? canvas.style.cursor = 'pointer' : canvas.style.cursor = 'default';
        if (mousePressed) {
            // Clear canvas every render
            context.clearRect(0, 0, canvas.width, canvas.height);
            nodes.map(node => {
                const distanceFromNode = parseInt(distance(node.pos.x, node.pos.y, mousePos.x, mousePos.y));
                isMouseInsideNode = distanceFromNode < NODE_SIZE;
                if (isMouseInsideNode === false) isMouseInsideNode = distanceFromNode < NODE_SIZE;
                if ((isMouseInsideNode && mousePressed) || isLinkingNodes) {
                    setIsLinkingNodes(true);
                    const nodeToLink = new NodeSource(node);
                    setNodeSource(nodeToLink);
                    renderClickLink(nodeToLink.getNode().pos, mousePos);
                }
            });
        }
    }

    /* =================================================== Edges ============================================================== */

    const isElementInArray = (array, value, callback = null) => {
        //pass callback to make it more specific if needed. 
        if (callback) return callback(array, value);

        return array.some(element => element === value);
    }

    const isConnectionRepeated = (array, value) => {
        if (value.source === value.target) return true;

        return array.some(element => {
            return (
                (element.source === value.source && element.target === value.target)
                || (element.source === value.target && element.target === value.source)
            );
        });
    }
    const connectNodes = (nodeA, nodeB) => {
        if (!nodeA || !nodeB) return;

        if (isElementInArray(edges, { source: nodeA.id, target: nodeB.id }, isConnectionRepeated)) 
            return alert('This connection has already been made.');
        const edgeInstantiator = new EdgeInstantiator(edgeId, nodeA.id, nodeB.id);
        dispatch(addEdge(edgeInstantiator.getEdge()));
    }

    const renderClickLink = (start, end) => {
        const context = getContext2d();
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y)
        context.stroke();
    };

    const renderEdges = () => edges.map(edge => renderNodeEdge(edge));

    const renderNodeEdge = edge => {
        const source = getNodeById[edge.source];
        const target = getNodeById[edge.target];

        const context = getContext2d();
        context.beginPath();
        context.moveTo(source.pos.x, source.pos.y);
        context.lineTo(target.pos.x, target.pos.y)
        context.stroke();
    };

    /* ============================================== Nodes ========================================================== */

    const getNodeByDistance = () => {
        return nodes.find(node => parseInt(distance(node.pos.x, node.pos.y, mousePos.x, mousePos.y)) < NODE_SIZE);
    };

    const createNode = event => {
        const canvasPos = getLocalCanvasAxis(canvasEl.current); // abs. size of element
        const nodePos = getMousePositionInCanvas(event, canvasPos);
        const nodeInstantiator = new NodeInstantiator(nodeId, nodePos);
        dispatch(addNode(nodeInstantiator.getNode()));
    };

    const renderNodes = () => nodes.map(node => renderNode(node));

    const renderNode = node => {
        const context = getContext2d();
        context.beginPath();
        context.arc(node.pos.x, node.pos.y, NODE_SIZE, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = node.color;
        context.fill();
    };

    /* ================================================= Helper functions ========================================================== */

    const clearCanvas = () => {
        const canvas = canvasEl.current;
        const context = getContext2d();
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Return the axis relative to the canvas
    const getMousePositionInCanvas = (mouse, canvasPos) => {
        return { x: mouse.clientX - canvasPos.x, y: mouse.clientY - canvasPos.y };
    };

    const getContext2d = () => {
        const canvas = canvasEl.current;
        return canvas.getContext("2d");
    };

    // Returns the position where the canvas element is located on the page, 
    const getLocalCanvasAxis = canvas => {
        let xPosition = 0;
        let yPosition = 0;

        while (canvas) {
            xPosition += (canvas.offsetLeft - canvas.scrollLeft + canvas.clientLeft);
            yPosition += (canvas.offsetTop - canvas.scrollTop + canvas.clientTop);
            canvas = canvas.offsetParent;
        }
        return {
            x: xPosition,
            y: yPosition
        };
    };

    /* =================================================== Rendering ========================================================== */
    return (
        <>
            <Navbar />
            {selectedNodeId &&
                <SideMenu
                    handleFormSubmit={handleFormSubmit}
                    title={getNodeById[selectedNodeId].title}
                    description={getNodeById[selectedNodeId].description}
                />
            }
            <GraphContainer>
                <IconGroupCanvas>
                    <a ref={saveIconLink}><IconButton onClick={handleSaveClick} borderRadius='50%' iconName='save'></IconButton></a>
                    <FileUploadIcon onChange={handleUploadClick} borderRadius={'50%'} />
                    <IconButton borderRadius='50%' iconName='question'></IconButton>
                    <IconButton onClick={handleEraseClick} borderRadius='50%' iconName='trash'></IconButton>
                </IconGroupCanvas>
                <GraphyCanvas
                    ref={canvasEl}
                    onMouseDown={handleClickHold}
                    onClick={handleClick}
                    onDoubleClick={handleDoubleClick}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >

                    {edges && renderEdges()}
                    {nodes && renderNodes()}
                </GraphyCanvas>
            </GraphContainer>
            <h4 style={{ float: "right" }}>Coordinates: [{mousePos.x},{mousePos.y}]</h4>
        </>
    );
}
export default Graphy;