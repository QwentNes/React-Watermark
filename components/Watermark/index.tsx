import * as React from 'react';
import style from "./Watermark.module.scss";
import {observer} from "mobx-react-lite";
import {useStores} from "../../hook/useStores";

interface MarkProps {
    id: number;
}

const Watermark: React.FC<MarkProps> = observer(({id}) => {
    const {watermarks, playground} = useStores()

    let config = watermarks.find(id)

    return (
        config ?
            <div
                onMouseDown={() => playground.setEdit(id)}
                style={{
                    top: config.current.position.top,
                    left: config.current.position.left,
                    width: config.current.size.width,
                    height: config.current.size.height
                }}
                className={style.watermark}>
                <img
                    src={config.initial.link}
                    alt={`img`}/>
            </div>
            : null
    );
});

export default Watermark