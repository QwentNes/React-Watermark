import React from 'react';
import {TMousePosition} from '../types/main';
import {useMousePosition} from './useMousePosition';
import {useStores} from './useStores';


export function useEditor(position: TMousePosition) {
    const editorRef = React.useRef(null) as React.MutableRefObject<any>
    const positionMouseEditor = useMousePosition(editorRef);
    const [fixed, setFixed] = React.useState<{ x: number, y: number }>({x: 0, y: 0})
    const {watermarks, playground} = useStores()
    const elementId = playground.config.edit
    const element = watermarks.find(elementId)?.current
    const scale = playground.config.scale

    const reScale = (scale: number, pos: number): number => {
        return (1 / scale * pos)
    }

    const DragDown = (): void => {
        setFixed({
            x: positionMouseEditor.x,
            y: positionMouseEditor.y
        })
    }
    
    const turned = (): void => {
        if (element) {
            watermarks.setParam(elementId, 'size_width',  reScale(scale, position.x) - element.position.left);
            watermarks.setParam(elementId, 'size_height', reScale(scale, position.y) - element.position.top);
        }
    }

    const reWidth = (): void => {
        if (element) {
            watermarks.setParam(elementId, 'size_width', reScale(scale, position.x) - element.position.left);
        }
    }

    const reHeight = ():void => {
        if(element) {
            watermarks.setParam(elementId, 'size_height', reScale(scale, position.y) - element.position.top);
        }
    }

    const drag = (): void => {
        if(element && position.x != 0 && position.y != 0){
            watermarks.setParam(elementId, 'position_top', reScale(scale, position.y) - element.size.height * fixed.y / (element.size.height * scale))
            watermarks.setParam(elementId, 'position_left', reScale(scale, position.x) - element.size.width * fixed.x / (element.size.width * scale))
        }
    }

    const eventsCallback = {
        "DragDown": () => DragDown(),
        "turned": () => turned(),
        "reWidth": () => reWidth(),
        "reHeight": () => reHeight(),
        "drag": () => drag(),
        "clearEditOnClick": () => playground.setEdit(-1),
    }

    const elementStyle: React.CSSProperties = {
        width: element?.size.width,
        height: element?.size.height,
        top: element?.position.top,
        left: element?.position.left,
        
    }

    return {elementStyle, editorRef, eventsCallback}

}