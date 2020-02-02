import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SELECTED_COLOR, DEFAULT_COLOR } from "./constants";
import { NodeInstantiator, EdgeInstantiator } from './GraphInstantiator';
import { Label } from 'components/atoms/Label';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Textarea from 'components/atoms/Textarea';
import FileUploadIcon from 'components/molecules/FileUploadIcon';
import IconButton from 'components/molecules/IconButton';
import Navbar from 'components/organisms/Navbar';
import SideMenu from 'components/organisms/SideMenu';
import ProgressCircle from 'components/atoms/ProgressCircle';
import Modal from 'components/organisms/Modal';
import { useInputChange } from 'components/customHooks';
import { distance } from 'containers/utils';
import { 
    GraphyCanvas, 
    IconGroupCanvas, 
    GraphContainer, 
    AppContainer, 
    ProgressContainer
} from './styled';
import { NodeSource } from './singletons';
import { 
    addNode,
    addEdge, 
    selectNode, 
    changeColor, 
    restartGraph, 
    addGraph, 
    updateNode,
    incrementNodeSize,
    decreaseNodeSize,
} from './actions';
import { 
    nodeByIdSelector, 
    arrayEdgesSelector, 
    arrayNodesSelector, 
    getSelectedNode, 
    getGraphSelector, 
    allEdgesSelector, 
    allNodesSelector,
    getNodeSize,
} from './selectors';

const Graphy = () => {
    // container data
    const [nodeSource, setNodeSource] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mousePressed, setMousePressed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const canvasEl = useRef(null);
    const saveIconLink = useRef(null);
    const [input, handleInputChange] = useInputChange();
    // drawing variables
    const [isLinkingNodes, setIsLinkingNodes] = useState(false);
    const [mousePointer, setMousePointer] = useState('default');
    // redux data
    const nodeSize = useSelector(state => getNodeSize(state));
    const nodesLength = useSelector(state => allNodesSelector(state)).length;
    const edgesLength = useSelector(state => allEdgesSelector(state)).length;
    const graph = useSelector(state => getGraphSelector(state));
    const getNodeById = useSelector(state => nodeByIdSelector(state));
    const edges = useSelector(state => arrayEdgesSelector(state));
    const nodes = useSelector(state => arrayNodesSelector(state));
    const selectedNodeId = useSelector(state => getSelectedNode(state));

    useEffect(() => {
        const canvas = canvasEl.current;
        canvas.setAttribute('height', '5000px');
        canvas.setAttribute('width', '5000px');
    }, []);

    useEffect(() => {
        getNodeByDistance() ? setMousePointer('pointer') : setMousePointer('default');
    });

    /* ==================================================== Events ================================================================ */

    const handleFormSubmit = (event, inputs) => {
        event.preventDefault();
        //modify actual node with the inputs values
        const modifiedNode = { ...getNodeById[selectedNodeId], ...inputs }
        //update the node state in redux store
        dispatch(updateNode(modifiedNode));
        eraseLinkingData();
    }

    const handleZoomIn = event => {
        dispatch(incrementNodeSize());
    }

    const handleZoomOut = event => {
        if(nodeSize < 10) return;
        dispatch(decreaseNodeSize());
        clearCanvas();
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

    const handleClick = async event => {
        const node = getNodeByDistance();
        if (!node) return;
        //actual selected node to DEFAULT COLOR
        if (selectedNodeId != null) dispatch(changeColor(selectedNodeId, DEFAULT_COLOR))
        await eraseLinkingData();
        dispatch(selectNode(node.id))
        //not actual selected  node to SELECTED_COLOR
        const nodeColor = SELECTED_COLOR;
        const nodeId = node.id;
        dispatch(changeColor(nodeId, nodeColor));
    }

    const handleCancelFormNode = event => {
        eraseLinkingData();
    }

    const handleDoubleClick = event => {
        const node = getNodeByDistance();
        createNode(event);
    }

    const handleClickHold = event => {
        setMousePressed(true);
        const canvas = canvasEl.current;
        const context = getContext2d(); 
        const clickedNode = getNodeByDistance();
        // Clear canvas every render
        context.clearRect(0, 0, canvas.width, canvas.height);
        nodes.map(node => {
            if (clickedNode) {
                setIsLinkingNodes(true);
                const nodeToLink = new NodeSource(clickedNode);
                setNodeSource(nodeToLink);
            }
        });
    }

    const handleMouseUp = event => {
        setMousePressed(false);
        const nodeTarget = getNodeByDistance();
        if ((nodeSource && nodeTarget) && isLinkingNodes) {
            if(nodeSource.getNode().id != nodeTarget.id) {
                connectNodes(nodeSource.getNode(), nodeTarget);
            }
        }
        if(nodeSource){
            nodeSource.destroy();
            setNodeSource(null);
        }
        setIsLinkingNodes(false);
    }

    const handleMouseMove = mouse => {
        const canvas = canvasEl.current;
        const context = getContext2d();
        
        const canvasPos = getLocalCanvasAxis(canvas);
        const mousePosInCanvas = getMousePositionInCanvas(mouse, canvasPos);
        setMousePos(mousePosInCanvas);
        // Clear canvas every render
        context.clearRect(0, 0, canvas.width, canvas.height);
        if(isLinkingNodes) renderEdge(nodeSource.getNode().pos, mousePos);
        
    }

    const displayModal = () => {
        setShowModal(true);
    }

    const hideModal = () => {
        setShowModal(false);
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
        const edgeInstantiator = new EdgeInstantiator(edgesLength, nodeA.id, nodeB.id);
        dispatch(addEdge(edgeInstantiator.getEdge()));
    }

    const renderEdge = (start, end) => {
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
        return nodes.find(node => parseInt(distance(node.pos.x, node.pos.y, mousePos.x, mousePos.y)) < nodeSize);
    };

    const createNode = event => {
        const canvasPos = getLocalCanvasAxis(canvasEl.current); // abs. size of element
        const nodePos = getMousePositionInCanvas(event, canvasPos);
        const nodeInstantiator = new NodeInstantiator(nodesLength, nodePos);
        dispatch(addNode(nodeInstantiator.getNode()));
    };

    const renderNodes = () => nodes.map(node => renderNode(node));

    const renderNode = node => {
        const context = getContext2d();
        context.beginPath();
        context.arc(node.pos.x, node.pos.y, nodeSize, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = node.color;
        context.fill();
    };

    /* ================================================= Helper functions ========================================================== */

    const eraseLinkingData = () => {
        dispatch(changeColor(selectedNodeId, DEFAULT_COLOR));
        setIsLinkingNodes(false);
        if(nodeSource) {
            nodeSource.destroy();
            setNodeSource(null)
        }
        dispatch(selectNode(null));
    }

    const listenToEnter = (element, buttonTrigger) => {
        element.addEventListener('keyup', event => {
            if(event.keyCode == 13) {
                event.preventDefault();
                buttonTrigger.click();
            }
        })
    }

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
        <div>
            <Navbar />
            <AppContainer>
                <GraphContainer>
                    <IconGroupCanvas>
                        <IconButton 
                            borderRadius='50%' 
                            iconName='search-plus'
                            onClick={handleZoomIn} 
                        >
                        </IconButton>
                        <IconButton 
                            borderRadius='50%' 
                            iconName='search-minus' 
                            onClick={handleZoomOut}
                        >
                        </IconButton>
                        <a ref={saveIconLink}>
                            <IconButton 
                                onClick={handleSaveClick} 
                                borderRadius='50%' 
                                iconName='save'
                            >
                            </IconButton>
                        </a>
                        <FileUploadIcon onChange={handleUploadClick} borderRadius={'50%'} />
                        <IconButton borderRadius='50%' iconName='question'></IconButton>
                        <IconButton 
                            onClick={handleEraseClick} 
                            borderRadius='50%' 
                            iconName='trash'
                        >
                        </IconButton>
                    </IconGroupCanvas>
                    <GraphyCanvas
                        mousePointer={mousePointer}
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
                <div style={{flex: '2'}}>
                    <SideMenu >
                        {selectedNodeId ?
                            <form onSubmit={event => handleFormSubmit(event, input)}>
                                <IconButton 
                                    iconName='times' 
                                    onClick={handleCancelFormNode} 
                                    style={{float: 'right'}}
                                    >
                                    X
                                </IconButton>
                                <Label>Write a title for:</Label>
                                <Input 
                                    name="title" 
                                    onChange={handleInputChange}
                                    defaultValue={getNodeById[selectedNodeId].title} 
                                />
                                <Label>Write a description</Label>
                                <Textarea 
                                    name="description" 
                                    onChange={handleInputChange} 
                                    defaultValue={getNodeById[selectedNodeId].description} 
                                />
                                <div style={{float: 'right'}}>
                                    <div style={{display:'inline-block', margin: '5px'}}>
                                        <Button type='submit' autoFocus>Save</Button>
                                    </div>
                                    <div style={{display:'inline-block', margin: '5px'}}>
                                        <Button type='reset' onClick={handleCancelFormNode}>Cancel</Button>
                                    </div>
                                </div>
                            </form>
                        :
                            <div>
                                <h2>Welcome to Graphy!</h2>
                                <ul>This is my tracking tool for:
                                    <li>making decisions</li>
                                    <li>display & handling data</li>
                                </ul>
                                {
                                    (nodesLength > 0 || edgesLength > 0) && 
                                    <>
                                    <h3>Resources:</h3>
                                    <ProgressContainer>
                                            <div style={{margin: '0 20px 20px 0'}}>
                                                <ProgressCircle 
                                                    rotation={180} 
                                                    time={'1'} 
                                                    size={'150px'}
                                                >
                                                    {nodesLength} nodes
                                                </ProgressCircle>
                                            </div>
                                            <div style={{margin: '0 20px 20px 0'}}>
                                                <ProgressCircle 
                                                    rotation={180} 
                                                    time={'1'} 
                                                    size={'150px'}
                                                >
                                                    {edgesLength} edges
                                                </ProgressCircle>
                                            </div>                                    
                                    </ProgressContainer>
                                    </>
                                    }
                            </div>
                        }
                    </SideMenu>
                </div>
            </AppContainer>
            {/* <h4 style={{ float: "right" }}>Coordinates: [{mousePos.x},{mousePos.y}]</h4> */}
        </div>
    );
}
export default Graphy;