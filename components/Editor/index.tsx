import * as React from 'react';
import style from "./Editor.module.scss"
import { TMousePosition } from "../../types/main";
import { observer } from "mobx-react-lite";
import { useEditor } from "../../hook/useEditor"
import { motion } from 'framer-motion';


interface EditorProps {
    position: TMousePosition
}

const Editor: React.FC<EditorProps> = observer(({ position }) => {
    const { elementStyle, editorRef, eventsCallback } = useEditor(position)

    return (
        <>
            <div
                ref={editorRef}
                style={elementStyle}
                className={style.resizer}>
                <motion.div className={style.center} onMouseDown={eventsCallback.DragDown} onPan={eventsCallback.drag}>
                    <div className={style.drag_moving} />
                </motion.div>
                <motion.div className={style.vertical} onPan={eventsCallback.reWidth}>
                    <div className={style.resize_width} />
                </motion.div>
                <motion.div className={style.turned} onPan={eventsCallback.turned}>
                    <div className={style.resize_multi} />
                </motion.div>
                <motion.div className={style.horizontal} onPan={eventsCallback.reHeight}>
                    <div className={style.resize_height} />
                </motion.div> 
            </div>
            <motion.div
                style={{
                    background: "transparent",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: 1
                }}
                onClick={eventsCallback.clearEditOnClick}
            />
        </>
    );
});

export default Editor