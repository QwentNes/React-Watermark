import React, {useEffect} from 'react';
import style from "./Playground.module.scss";
import {motion} from 'framer-motion'
import {useDimensions} from "../../hook/useDimensions";

interface PlaygroundProps {
    data: {
        size: {
            width: number,
            height: number,
        },
        link: string,
    },
    innerRef: React.RefObject<any>,
    position: {
        x: number,
        y: number
    },
    scale: {
        meaning: number,
        setScale: React.Dispatch<React.SetStateAction<number>>,
    }
}

const Playground: React.FC<PlaygroundProps> = ({data, innerRef, scale, position, children}) => {

    const sizeRef = React.useRef(null) as React.MutableRefObject<any>
    const [sizer, setSizer] = React.useState({
        width: data.size.width * scale.meaning,
        height: data.size.height * scale.meaning,
    })
    const dimensions = useDimensions(innerRef, [sizer])

    useEffect(() => {
        const Resizer = (e: React.WheelEvent): void => {
            if (e.ctrlKey) {
                e.preventDefault()
                let scaleResult = scale.meaning + (e.deltaY > 0 ? -0.05 : 0.05);


                if (scaleResult > 0.10) {
                    setSizer({
                        width: data.size.width * scaleResult,
                        height: data.size.height * scaleResult,
                    })

                    scale.setScale(scaleResult)
                }

                const x = position.x !== 0 ? position.x : sizeRef.current.scrollLeft + sizeRef.current.clientWidth / 2;
                const y = position.y !== 0 ? position.y : sizeRef.current.scrollTop + sizeRef.current.clientHeight / 2;

                const left = Math.ceil((x / dimensions.prevWidth) * dimensions.width - x);
                const top = Math.ceil((y / dimensions.prevHeight) * dimensions.height - y);

                sizeRef.current.scrollBy({left, top});
            }
        }

        sizeRef.current.addEventListener("wheel", Resizer)

        return () => sizeRef.current.removeEventListener("wheel", Resizer)
    }, [sizer])

    return (
        <div className={style.content}>
            <div className={style.shell}>
                <div ref={sizeRef} className={style.scroll_block}>
                    <div className={style.scroll_wrap}>
                        <div ref={innerRef} className={style.playground_sizer} style={{
                            width: sizer.width,
                            height: sizer.height,
                        }}>
                            <motion.div className={style.playground}
                                        animate={{
                                            width: data.size.width,
                                            height: data.size.height,
                                            scale: scale.meaning
                                        }}
                                        transition={{
                                            type: "Inertia",
                                            stiffness: 5
                                        }}>
                                {children}
                                <motion.img src={data.link} width={data.size.width} height={data.size.height}/>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playground