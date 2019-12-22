import React, { useState, useEffect, useRef } from 'react';
import { GraphyCanvas, SpeechBubble } from './styled';
import { NodeInstantiator, EdgeInstantiator } from './GraphInstantiator';
import { distance } from '../utils';
import { NodeSource, SelectedNode } from './singletons';
import IconButton from '../../components/molecules/IconButton';
import { SELECTED_COLOR, NODE_SIZE, NODES, DEFAULT_COLOR } from "./constants";
import { useDispatch, useSelector } from 'react-redux';
import { addNode, addEdge, selectNode, changeColor } from './actions';
import { nodeByIdSelector, arrayEdgesSelector, arrayNodesSelector, getSelectedNode } from './selectors';

const Graphy = () => {
    // container data
    const [nodeId, setNodeId] = useState(0);
    const [edgeId, setEdgeId] = useState(0);
    const [nodeSource, setNodeSource] = useState({});
    const [mousePos, setMousePos] = useState({x:0,y:0});
    const [mousePressed, setMousePressed] = useState(false);
    const canvasEl = useRef(null);
    // drawing variables
    const [isLinkingNodes,setIsLinkingNodes] = useState(false);    
    // redux data
    const dispatch = useDispatch();
    const getNodeById = useSelector(state => nodeByIdSelector(state));
    const edges = useSelector(state => arrayEdgesSelector(state));
    const nodes = useSelector(state => arrayNodesSelector(state));
    const selectedNode = useSelector(state => getSelectedNode(state));

    useEffect(() => {
        const canvas = canvasEl.current;
        canvas.setAttribute('height', '400px');
        canvas.setAttribute('width', '1200px');
    }, []);

    /* ==================================================== Events ================================================================ */

    const handleClick = (event) => {
        const node = getNodeByDistance();
        if(!node) return;

        //actual node to DEFAULT COLOR
        if(selectedNode != null) dispatch(changeColor(getNodeById[selectedNode].id, DEFAULT_COLOR))
        
        dispatch(selectNode(node.id))
        //not actual node to SELECTED_COLOR
        const nodeColor = SELECTED_COLOR;
        const nodeId = node.id;
        dispatch(changeColor(nodeId, nodeColor));



        // highlight the clicked node with an unique color or wonderful way of describing that the node is selected :)
        // maybe another SINGLETON would be the way of achieving this
        /* hype menu that shows all the information of the node
            Form
              / Input, label, button
            iconed button with callbacks such as quit from the menu view
            form example:
                Circle information                    |quit|
                Title:
                    title displayed in node
                description:
                    anything that the user wants to write
                images>
                    probably a later feature
                         ____
                        |SAVE|
        */    
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
        if(isLinkingNodes) {
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
        node? canvas.style.cursor = 'pointer' : canvas.style.cursor = 'default';
        if(mousePressed) {
            // Clear canvas every render
            context.clearRect(0, 0, canvas.width, canvas.height);
            nodes.map(node => {
                const distanceFromNode = parseInt(distance(node.pos.x, node.pos.y, mousePos.x, mousePos.y));
                isMouseInsideNode = distanceFromNode < NODE_SIZE;
                if(isMouseInsideNode === false) isMouseInsideNode = distanceFromNode < NODE_SIZE;
                if( (isMouseInsideNode && mousePressed) || isLinkingNodes) {
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

        return array.some(element =>  {
            return (
                (element.source === value.source && element.target === value.target)
                || (element.source === value.target && element.target === value.source)
            );  
        });
    }
    const connectNodes = (nodeA, nodeB) => {
        if(!nodeA || !nodeB) return;

        if(isElementInArray(edges, { source: nodeA.id, target: nodeB.id }, isConnectionRepeated)) return;
        setEdgeId(edgeId + 1);
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
        setNodeId(nodeId + 1);
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
        return {x: mouse.clientX - canvasPos.x, y: mouse.clientY - canvasPos.y};
    };

    const getContext2d = () => {
        const canvas = canvasEl.current;
        return canvas.getContext("2d");
    };

    // Returns the position where the canvas element is located on the page, 
    const getLocalCanvasAxis = (canvas) => {
        var xPosition = 0;
        var yPosition = 0;
        
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
        {selectedNode && (
            //position above the selected node, displaying all options (position absolute)
            <SpeechBubble>
                <IconButton iconName='coffee'/>
                <IconButton iconName='coffee'/>
                <IconButton iconName='coffee'/>
            </SpeechBubble>
        )}
            <GraphyCanvas 
                ref={canvasEl} 
                onMouseDown={handleClickHold}
                onClick={handleClick}
                onDoubleClick={handleDoubleClick} 
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                {/* show form that later will output a node.*/}

                { edges && renderEdges() }
                { nodes && renderNodes() }
            </GraphyCanvas>
            <h4 style={{float: "right"}}>Coordinates: [{mousePos.x},{mousePos.y}]</h4>
        </>
    );
}
export default Graphy;