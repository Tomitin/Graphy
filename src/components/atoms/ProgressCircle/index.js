import React from 'react';
import { TextInsideCircle, CircleWrapper, Mask, InsideCircle, CircleFill } from './styled';

const ProgressCircle = props => {

    return (
        <CircleWrapper size={props.size} >
            <Mask full rotation={props.rotation} time={props.time} >
                <CircleFill rotation={props.rotation} time={props.time} />
            </Mask>

            <Mask rotation={props.rotation} time={props.time} >
                <CircleFill rotation={props.rotation} time={props.time} />
            </Mask>

            <InsideCircle>
                <TextInsideCircle > {props.children} </TextInsideCircle>
            </InsideCircle>
        </CircleWrapper>
    );
}

export default ProgressCircle;