import React, {useEffect} from 'react';
import style from "./Playground.module.scss";
import {motion} from 'framer-motion'

interface PlaygroundProps {
    data: {
        size: {
            width: number,
            height: number,
        },
        link: string,
    }
}

const Playground: React.FC<PlaygroundProps> = ({data}) => {
    const sizeRef = React.useRef(null) as React.MutableRefObject<any>
    const scale = 0.65
    const [sizer, setSizer] = React.useState({
        width: data.size.width * scale,
        height: data.size.height * scale,
        scale: scale
    })

    useEffect(() => {

        const Resizer = (e: React.WheelEvent): void => {
            if (e.ctrlKey) {
                e.preventDefault()
                let scale = sizer.scale + (e.deltaY > 0 ? -0.05 : 0.05);
                scale > 0.12 &&
                setSizer({
                    width: data.size.width * scale,
                    height: data.size.height * scale,
                    scale: scale,
                })
            }
        }

        sizeRef.current.addEventListener("wheel", Resizer)

        return () => sizeRef.current.removeEventListener("wheel", Resizer)
    }, [sizer])


    return (
        <div className={style.content}>
            <div className={style.shell}>
                <div ref={sizeRef} className={style.scroll_block}>
                    <div className={style.playground_sizer} style={{
                        width: sizer.width,
                        height: sizer.height,
                    }}>
                        <motion.div className={style.playground}
                                    animate={{
                                        width: data.size.width,
                                        height: data.size.height,
                                        scale: sizer.scale
                                    }}
                                    transition={{
                                        type: "Inertia",
                                        stiffness: 5
                                    }}>
                            <motion.img src={data.link} width={data.size.width} height={data.size.height}/>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playground