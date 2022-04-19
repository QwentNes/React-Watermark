import * as React from 'react';
import style from "./Editor.module.scss"
import {TMousePosition} from "../../types/main";
import {observer} from "mobx-react-lite";
import {useEditor} from "../../hook/useEditor"


interface EditorProps {
    position: TMousePosition
}

const Editor: React.FC<EditorProps> = observer(({position}) => {
    const {elementStyle, editorRef, eventsCallback, StopSizer} = useEditor(position)

    return (
        <>
            <div
                ref={editorRef}
                style={elementStyle}
                className={style.resizer}>
                <div className={style.center} onMouseUp={eventsCallback.DragUp}>
                    <div className={style.drag_moving} onMouseDown={eventsCallback.DragDown}/>
                </div>
                <div className={style.vertical} onMouseUp={eventsCallback.reWidthUp}>
                    <div className={style.resize_width} onMouseDown={eventsCallback.reWidthDown}/>
                </div>
                <div className={style.turned} onMouseUp={eventsCallback.TurnedUp}>
                    <div className={style.resize_multi} onMouseDown={eventsCallback.TurnedDown}/>
                </div>
                <div className={style.horizontal} onMouseUp={eventsCallback.reHeightUp}>
                    <div className={style.resize_height} onMouseDown={eventsCallback.reHeightDown}/>
                </div>
            </div>
            <StopSizer/>
        </>
    );
});

export default Editor