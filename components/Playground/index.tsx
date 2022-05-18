import React from 'react';
import {observer} from "mobx-react-lite";
import style from "./Playground.module.scss";
import {motion} from 'framer-motion'
import {usePlayground} from '../../hook/usePlayground';
import {TMousePosition} from '../../types/main';


interface PlaygroundProps {
    workSpaceRef: React.RefObject<HTMLDivElement>,
    position: TMousePosition,
}

const Playground: React.FC<PlaygroundProps> = observer(({workSpaceRef, position, children}) => {
    const {scrollBlockRef, playgroundSize, playgroundAnimate, image, isLoading} = usePlayground(workSpaceRef, position)
    return (
        <div className={style.content}>
            <div className={style.shell}>
                {
                    isLoading && <div className={style.playground_loader}>
                    <div className={style.loader_block}>
                        <div className={style.loader_icon}>
                            <img width={75} height={75} src="./chubrik_loader.gif" />
                        </div>
                        <span>Подготовка</span>
                    </div>
                </div>
                }
                <div ref={scrollBlockRef} className={style.scroll_block}>
                    <div className={style.scroll_wrap}>
                        <div ref={workSpaceRef} className={style.playground_sizer} style={playgroundSize}>
                            <motion.div className={style.playground} animate={playgroundAnimate}>
                                {children}
                                <motion.img src={`https://api.watermarker.space/uploads/`+image.src} width={image.width} height={image.height}/>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Playground