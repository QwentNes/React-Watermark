import React from 'react';
import {observer} from "mobx-react-lite";
import style from "./Playground.module.scss";
import {motion} from 'framer-motion'
import { usePlaygorund } from '../../hook/usePlayground';
import { TMousePosition } from '../../types/main';

interface PlaygroundProps {
    workSpaceRef: React.RefObject<HTMLDivElement>,
    position: TMousePosition,
}

const Playground: React.FC<PlaygroundProps> = observer(({workSpaceRef, position, children}) => {

    const {scrollBlockRef, playgroundSize, playgroundAnimate, image} = usePlaygorund(workSpaceRef, position)

    return (
        <div className={style.content}>
            <div className={style.shell}>
                <div ref={scrollBlockRef} className={style.scroll_block}>
                    <div className={style.scroll_wrap}>
                        <div ref={workSpaceRef} className={style.playground_sizer} style={playgroundSize}>
                            <motion.div className={style.playground} animate={playgroundAnimate}>
                                {children}
                                <motion.img src={image.src} width={image.width} height={image.height}/>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Playground