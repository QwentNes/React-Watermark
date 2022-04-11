import * as React from 'react';
import style from "./Watermark.module.scss";

interface MarkProps {
    position: {
        x: number,
        y: number
    },
    scale: number
}

const Watermark: React.FC<MarkProps> = ({position, scale}) => {
    const [event, setEvent] = React.useState({
        multi: false,
        width: false,
        height: false,
        drag: false,
    })

    const [config, setConfig] = React.useState({
        media: "https://i.ibb.co/56jGxJS/1.png",
        mode: 'normal',
        position: {
            top: 0,
            left: 0,
        },
        size: {
            width: 250,
            height: 250,
        },
    })

    const reScale = (scale: number, pos: number): number => {
        return (1 / scale * pos)
    }

    React.useEffect(() => {
        (event.width && position.x != 0) &&
        setConfig(prev => (
            {
                ...config,
                size: {
                    width: reScale(scale, position.x),
                    height: prev.size.height,
                }
            }
        ));
        (event.height && position.y != 0) &&
        setConfig(prev => (
            {
                ...config,
                size: {
                    width: prev.size.width,
                    height: reScale(scale, position.y),
                }
            }
        ));
    }, [position, event])

    return (
        <>
            <div
                style={{
                    top: config.position.top,
                    left: config.position.left,
                    width: config.size.width,
                    height: config.size.height
                }}
                className={style.watermark}>
                <img
                    src={config.media}
                    alt={`img`}/>
            </div>
            <div
                style={{
                    top: config.position.top,
                    left: config.position.left,
                    width: config.size.width,
                    height: config.size.height
                }}
                className={style.resizer}>
                <div className={style.center}>
                    <div className={style.drag_moving}/>
                </div>
                <div className={style.vertical}
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
                 onMouseUp={() => setEvent({width: false, height: false, multi: false, drag: false})}/>
        </>
    );
};

export default Watermark