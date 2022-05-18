import * as React from 'react';
import style from "./Watermark.module.scss";
import {observer} from "mobx-react-lite";
import {useStores} from "../../hook/useStores";
import {StringKeys} from "../../types/main";

interface MarkProps {
    id: number;
}

const Watermark: React.FC<MarkProps> = observer(({id}) => {
    const {watermarks, playground} = useStores()

    let config = watermarks.find(id)
    const presets : StringKeys = {
        "black" : style.preset_black,
        "blur" : style.preset_blur,
        "contrast" : style.preset_contrast,
        "invert" : style.preset_invert,
        "normal" : style.preset
    }
    return (
        config ?
            <div
                onMouseDown={() => playground.setEdit(id)}
                style={{
                    top: config.current.position.top,
                    left: config.current.position.left,
                    width: config.current.size.width,
                    height: config.current.size.height,
                    opacity: config.current.opacity,
                    zIndex: config.current.zIndex,
                }}
                className={style.watermark}>
                <img
                    className={presets[config.current.mode]}
                    src={"https://api.watermarker.space/uploads/"+config.initial.link}
                    alt={`img`}/>
            </div>
            : null
    );
});

export default Watermark