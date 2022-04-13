import React, {useEffect} from 'react';
import {useDimensions} from "../../hook/useDimensions";
import {observer} from "mobx-react-lite";
import {TMousePosition} from "../../types/main";
import style from "./Playground.module.scss";
import {motion} from 'framer-motion'
import {useStores} from "../../hook/useStores";

interface PlaygroundProps {
    innerRef: React.RefObject<any>,
    position: TMousePosition,
}

const Playground: React.FC<PlaygroundProps> = observer(({innerRef, position, children}) => {
    const {playground} = useStores()

    const data = playground.config;
    const scale = data.scale;
    const sizeRef = React.useRef(null) as React.MutableRefObject<any>

    const [sizer, setSizer] = React.useState({
        width: data.size.width * scale,
        height: data.size.height * scale,
    })
    const dimensions = useDimensions(innerRef, [sizer])

    useEffect(() => {
        const Resizer = (e: React.WheelEvent): void => {
            if (e.ctrlKey) {
                e.preventDefault()
                let scaleResult = scale + (e.deltaY > 0 ? -0.05 : 0.05);


                if (scaleResult > 0.10) {
                    setSizer({
                        width: data.size.width * scaleResult,
                        height: data.size.height * scaleResult,
                    })

                    playground.setScale(scaleResult)
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
                                            scale: scale
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
});

export default Playground