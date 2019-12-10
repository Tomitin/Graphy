import React, { useState, useEffect, useRef } from 'react';
import Node from './../../components/organisms/Node';
import { GraphyCanvas } from './styled';
import NodeInstantiator from './nodeInstantiator';

const Graphy = () => {
    const [axis, setAxis] = useState({x:0,y:0});
    const [showForm, setShowForm] = useState(false);
    const canvasEl = useRef(null);
    //Future redux data in store
    const [nodes, setNodes] = useState([]);
    const [nodeId, setNodeId] = useState(0);

    useEffect(() => {
        const ctx = getCanvas2d();
        // get DPI
        const dpi = window.devicePixelRatio;
        fixDPI(canvasEl.current,dpi)
    }, []); // only run when the component is created and destroyed

    // The canvas object doesn't scale automatically as texts and other elements, so it has to be done manually
    function fixDPI(canvas, dpi){
        // get CSS height
        // the + prefix casts it to an integer
        // the slice method gets rid of "px"
        const style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
        const style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

        // scale the canvas
        canvas.setAttribute('height', style_height * dpi);
        canvas.setAttribute('width', style_width * dpi);

    }

    const handleClick = (e) => {
        //  setShowForm(true); //  show form with input add/cancel when the node is in pre creation process
        //                      //  todo: show the input,buttons centered relative[x,y] to the node
    }

    const handleDoubleClick = (e) => {
        const rect = canvasEl.current.getBoundingClientRect(); // abs. size of element
        const nodePos = getLocalCanvasAxis(e, rect);
        setNodeId(nodeId + 1);
        let nodeInstantiator = new NodeInstantiator(nodePos, nodeId);
        const node = nodeInstantiator.getNode();
        setNodes([
            ...nodes,
            node
        ]);
        console.log(nodes);
    }

    //return the position of the mouse relative to the container where the mouse resides in
    //-canvas is specified so we know in which canvas should we call this function.
    const getLocalCanvasAxis = (mouse, canvas) => {
        return {x: (mouse.clientX - canvas.left), y: (mouse.clientY - canvas.top)}
    }

    const handleMouseMove = e => {
        const rect = canvasEl.current.getBoundingClientRect(); // abs. size of element
        setAxis(getLocalCanvasAxis(e, rect));
    }

    const getCanvas2d = () => {
        // get canvas as ref
        const canvas = canvasEl.current;
        // get context
        return canvas.getContext("2d");
    }

    const renderNode = (node) => {
        const ctx = getCanvas2d();
        ctx.beginPath();
        ctx.arc(node.pos.x, node.pos.y, 20, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    return (
        <>
            <GraphyCanvas ref={canvasEl} onDoubleClick={handleDoubleClick} onClick={handleClick} onMouseMove={handleMouseMove}>
                {/* show form that later will output a node.*/}

                {nodes && nodes.map((node) => {
                    return(
                        renderNode(node)
                    );
                })}
            </GraphyCanvas>
            <h4 style={{float: "right"}}>Coordinates: [{axis.x},{axis.y}]</h4>
        </>
    );
}
export default Graphy;






// draw canvas circle
