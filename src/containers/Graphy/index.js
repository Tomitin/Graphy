import React, { useState, useEffect, useRef } from 'react';
import { GraphyCanvas } from './styled';
import NodeInstantiator from './nodeInstantiator';
import { distance } from './utils';
import { NodeSource } from './singletons';

const Graphy = () => {
    const [mousePos, setMousePos] = useState({x:0,y:0});
    const [mousePressed, setMousePressed] = useState(false);
    const canvasEl = useRef(null);
    //Future redux data in store
    const [nodes, setNodes] = useState([]);
    const [nodeId, setNodeId] = useState(0);
    const [links, setLinks] = useState([]);
    const [nodeSource, setNodeSource] = useState({});
    //constants
    const NODE_SIZE = 30;
    //drawing variables
    const [isLinkingNodes,setIsLinkingNodes] = useState(false);

    useEffect(() => {
        const canvas = canvasEl.current;
        canvas.setAttribute('height', '400px');
        canvas.setAttribute('width', '1200px');
    }, []); // only run when the component is created and destroyed

    const handleDoubleClick = event => {
        createNode(event);
    }

    const handleClickHold = event => {
        setMousePressed(true);
    }

    const handleMouseUp = event => {
        setMousePressed(false);
        if(isLinkingNodes) {
            // console.log('linking nodes...')
            const nodeTarget = nodes.find(node => parseInt(distance(node.pos.x, node.pos.y, mousePos.x, mousePos.y)) < NODE_SIZE);
            connectNodes(nodeSource.getNode(), nodeTarget);
            setIsLinkingNodes(false);
            // console.log(links)
        }
    }

    const connectNodes = (nodeA, nodeB) => {
        setLinks([
            ...links,
            {
                source: nodeA.id,
                target: nodeB.id,
            },
        ]);
    }

    //delete
    const createLine = (start, end) => {
        const context = getContext2d();
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y)
        context.stroke();

    }

    const renderLink = link => {
        const source = getNodeById(link.source);
        const target = getNodeById(link.target);

        const context = getContext2d();
        context.beginPath();
        context.moveTo(source.pos.x, source.pos.y);
        context.lineTo(target.pos.x, target.pos.y)
        context.stroke();

        console.log(links)
    }

    const getNodeById = id => {
        return nodes.find(node => node.id === id);
    }

    const createNode = event => {
        const canvasPos = getLocalCanvasAxis(canvasEl.current); // abs. size of element
        const nodePos = getMousePositionInCanvas(event, canvasPos);
        setNodeId(nodeId + 1);
        const nodeInstantiator = new NodeInstantiator(nodePos, nodeId);
        const node = nodeInstantiator.getNode();
        setNodes([
            ...nodes,
            node
        ]);
    }

    const renderNode = node => {
        const context = getContext2d();
        context.beginPath();
        context.arc(node.pos.x, node.pos.y, NODE_SIZE, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    }

    const handleMouseMove = event => {
        const context = getContext2d();
        const canvas = canvasEl.current;

        const canvasPos = getLocalCanvasAxis(canvas);
        const mousePosInCanvas = getMousePositionInCanvas(event, canvasPos);
        let isMouseInsideNode = false;
        
        setMousePos(mousePosInCanvas);
        if(mousePressed) {
            // Clear canvas every render
            context.clearRect(0, 0, canvas.width, canvas.height);
            nodes.map(node => {
                const distanceFromNode = parseInt(distance(node.pos.x, node.pos.y, mousePos.x, mousePos.y));
                isMouseInsideNode = distanceFromNode < NODE_SIZE;
                if(isMouseInsideNode == false) isMouseInsideNode = distanceFromNode < NODE_SIZE;
                if( (isMouseInsideNode && mousePressed) || isLinkingNodes) {
                    // console.log('distanceFromNode', distanceFromNode, 'from node', node.id)
                    //TODO>  look up for singletons
                    setIsLinkingNodes(true);
                    const nodeToLink = new NodeSource(node);
                    setNodeSource(nodeToLink);
                    createLine(node.pos, mousePos);
                }
            });
        }
    }

    // Return the axis relative to the canvas
    const getMousePositionInCanvas = (mouse, canvasPos) => {
        return {x: mouse.clientX - canvasPos.x, y: mouse.clientY - canvasPos.y};
    }

    const getContext2d = () => {
        // get canvas as ref
        const canvas = canvasEl.current;
        // get context
        return canvas.getContext("2d");
    }

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
    }

    return (
        <>
            <GraphyCanvas 
                ref={canvasEl} 
                onMouseDown={handleClickHold} 
                onDoubleClick={handleDoubleClick} 
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                {/* show form that later will output a node.*/}

                {nodes && nodes.map(node => {
                    return (
                        renderNode(node)
                    );
                })}
                {links && links.map(link => {
                    return (
                        renderLink(link)
                    );
                })}
            </GraphyCanvas>
            <h4 style={{float: "right"}}>Coordinates: [{mousePos.x},{mousePos.y}]</h4>
        </>
    );
}
export default Graphy;