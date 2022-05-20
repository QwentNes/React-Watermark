import React, {useCallback} from 'react';
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

    const [event, setEvent] = React.useState({
        multi: false,
        width: false,
        height: false,
        drag: false,
        turned: false,
    })

    const shareBlock = (positioning: string): number => {
        if (fixed.y != 0 && fixed.x != 0) {
            switch (positioning) {
                case 'y':
                    // @ts-ignore
                    return fixed.y / (element.size.height * scale)
                case 'x':
                    // @ts-ignore
                    return fixed.x / (element.size.width * scale)
                default:
                    return 0
            }
        }
        return 0.5
    }

    const reScale = (scale: number, pos: number): number => {
        return (1 / scale * pos)
    }

    React.useEffect(() => {
        if (element) {
            (event.width && position.x != 0) ?
                watermarks.setParam(elementId, 'size_width', reScale(scale, position.x) - element.position.left) : null;

            (event.height && position.y != 0) ?
                watermarks.setParam(elementId, 'size_height', reScale(scale, position.y) - element.position.top) : null;

            if (event.drag && position.x && position.y) {
                watermarks.setParam(elementId, 'position_top', reScale(scale, position.y) - element.size.height * shareBlock('y'))
                watermarks.setParam(elementId, 'position_left', reScale(scale, position.x) - element.size.width * shareBlock('x'))
            }

            if(event.turned && position.x && position.y) {
                let Diagonal = (reScale(scale, position.y) - element.position.left + reScale(scale, position.x) - element.position.top) / 2;
                watermarks.setParam(elementId, 'size_width', Diagonal);
                watermarks.setParam(elementId, 'size_height', Diagonal);
            }
        }
    }, [position, event])

    const DragUp = (): void => {
        setEvent({...event, drag: false})
    }

    const DragDown = (): void => {
        setEvent({...event, drag: true})
        setFixed({
            x: positionMouseEditor.x,
            y: positionMouseEditor.y
        })
    }

    const reWidthUp = (): void => {
        setEvent({...event, width: false})
    }

    const reWidthDown = (): void => {
        setEvent({...event, width: true})
    }

    const reHeightUp = (): void => {
        setEvent({...event, height: false})
    }

    const reHeightDown = (): void => {
        setEvent({...event, height: true})
    }

    const TurnedUp = (): void => {
        setEvent({...event, turned: false})
    }

    const TurnedDown = (): void => {
        setEvent({...event, turned: true})
    }

    const eventsCallback = {
        "DragUp": () => DragUp(),
        "DragDown": () => DragDown(),
        "TurnedUp" : () => TurnedUp(),
        "TurnedDown": () => TurnedDown(),
        "reWidthUp": () => reWidthUp(),
        "reWidthDown": () => reWidthDown(),
        "reHeightUp": () => reHeightUp(),
        "reHeightDown": () => reHeightDown()
    }

    const elementStyle: React.CSSProperties = {
        width: element?.size.width,
        height: element?.size.height,
        top: element?.position.top,
        left: element?.position.left,
    }

    const StopSizer = useCallback(
        () => {
            return (
                <div
                    style={{
                        background: "transparent",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        zIndex: 1
                    }}
                    onMouseUp={() => setEvent({width: false, height: false, multi: false, drag: false, turned: false})}
                    onClick={() => playground.setEdit(-1)}
                />
            )
        }, [])

    return {elementStyle, editorRef, eventsCallback, StopSizer}

}