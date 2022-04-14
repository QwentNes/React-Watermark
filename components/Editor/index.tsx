import * as React from 'react';
import {TMousePosition} from "../../types/main";
import style from "./Editor.module.scss"
import {observer} from "mobx-react-lite";
import {useStores} from "../../hook/useStores";
import {useMousePosition} from "../../hook/useMousePosition";


interface EditorProps {
    position: TMousePosition
}

const Editor: React.FC<EditorProps> = observer(({position}) => {

    const editorRef = React.useRef(null) as React.MutableRefObject<any>
    const positionMouseEditor = useMousePosition(editorRef);
    const [fixed, setFixed] = React.useState<{x: number, y: number}>({x: 0, y: 0})
    const {watermarks, playground} = useStores()

    const [event, setEvent] = React.useState({
        multi: false,
        width: false,
        height: false,
        drag: false,
    })

    const elementId = playground.config.edit
    const element = watermarks.find(elementId)?.current
    const scale = playground.config.scale

    const reScale = (scale: number, pos: number): number => {
        return (1 / scale * pos)
    }

    const shareBlock = (positioning : string) : number => {
        if(fixed.y != 0 && fixed.x != 0){
            switch (positioning){
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

    React.useEffect(() => {
        if(element){
            (event.width && position.x != 0) ?
                watermarks.setParam(elementId, 'size_width' ,reScale(scale, position.x) - element.position.left): null;

            (event.height && position.y != 0) ?
                watermarks.setParam(elementId, 'size_height' ,reScale(scale, position.y) - element.position.top): null;

            if(event.drag && position.x && position.y){
                watermarks.setParam(elementId, 'position_top' ,reScale(scale, position.y) - element.size.height * shareBlock('y'))
                watermarks.setParam(elementId, 'position_left' ,reScale(scale, position.x) - element.size.width * shareBlock('x'))
            }
        }
    }, [position, event])

    return (
        element ?
        <>
            <div
                ref={editorRef}
                style={{
                    width: element.size.width,
                    height: element.size.height,
                    top: element.position.top,
                    left: element.position.left,
                }}
                className={style.resizer}>
                <div
                    onMouseUp={() => setEvent({...event, drag: false})}
                    className={style.center}>
                    <div
                        className={style.drag_moving}
                        onMouseDown={() => {
                            setEvent({...event, drag: true})
                            setFixed({
                                x: positionMouseEditor.x,
                                y:  positionMouseEditor.y
                            })
                        }}
                    />
                </div>
                <div
                    className={style.vertical}
                    onMouseUp={() => setEvent({...event, width: false})}>
                    <div className={style.resize_width}
                         onMouseDown={() => setEvent({...event, width: true})}/>
                </div>
                <div className={style.turned}>
                    <div className={style.resize_multi}/>
                </div>
                <div className={style.horizontal}
                     onMouseUp={() => setEvent({...event, height: false})}>
                    <div className={style.resize_height}
                         onMouseDown={() => setEvent({...event, height: true})}/>
                </div>
            </div>
            <div className={style.stopSizer}
                 onMouseUp={() => setEvent({width: false, height: false, multi: false, drag: false})}
                 onClick={() => playground.setEdit(-1)}/>
        </> : null
    );
});

export default Editor