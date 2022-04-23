import * as React from 'react';
import style from "./Instruments.module.scss";
import {motion} from 'framer-motion';
import { useTooltip } from '../../hook/useTooltip';
import {useStores} from "../../hook/useStores";
import {StringKeys} from "../../types/main";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

interface BarProps {
    data: Array<{
        action: string,
        tooltip: string,
        icon: React.ReactElement
    }>
}

const InstrumentsBar: React.FC<BarProps> = ({data}) => {
    return (
        <div className={style.instruments_block}>
            {
                data.map((item, index) => {
                    return <BarItem key={index} item={item}/>
                })
            }
            <div className={style.github}>
                <BarItem
                    item={{
                        action: "GitHub",
                        tooltip: "GitHub",
                        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path xmlns="http://www.w3.org/2000/svg" d="m12.06937,1.27163c-5.87146,0 -10.6319,4.90816 -10.6319,10.96364c0,4.84338 3.04635,8.95229 7.27185,10.40252c0.53184,0.10036 0.72564,-0.23813 0.72564,-0.52918c0,-0.25957 -0.00885,-0.94933 -0.01416,-1.864c-2.95785,0.66239 -3.58172,-1.46985 -3.58172,-1.46985c-0.48361,-1.26593 -1.18093,-1.60305 -1.18093,-1.60305c-0.96545,-0.68064 0.07301,-0.66695 0.07301,-0.66695c1.06722,0.07801 1.6287,1.12998 1.6287,1.12998c0.94864,1.67513 2.48885,1.19111 3.09457,0.91101c0.0969,-0.70846 0.37078,-1.19157 0.6752,-1.46574c-2.36097,-0.27645 -4.84362,-1.21757 -4.84362,-5.41818c0,-1.19659 0.41459,-2.17557 1.09465,-2.94197c-0.10929,-0.27736 -0.47432,-1.39184 0.10398,-2.90137c0,0 0.89289,-0.2947 2.92423,1.12405c0.8482,-0.24315 1.7579,-0.36495 2.66185,-0.36906c0.90306,0.00411 1.81276,0.12591 2.66229,0.36906c2.03001,-1.41875 2.92113,-1.12405 2.92113,-1.12405c0.58007,1.50954 0.21504,2.62401 0.10575,2.90137c0.68139,0.7664 1.09332,1.74539 1.09332,2.94197c0,4.21155 -2.48663,5.13808 -4.85557,5.40951c0.38229,0.33849 0.7221,1.00727 0.7221,2.03051c0,1.46529 -0.01283,2.64773 -0.01283,3.00675c0,0.29379 0.19114,0.63502 0.73095,0.52781c4.22197,-1.45297 7.26566,-5.55914 7.26566,-10.40115c0,-6.05548 -4.76088,-10.96364 -10.63412,-10.96364"/>
                        </svg>
                    }}/>
            </div>
        </div>
    );
};

interface ItemProps {
    item: {
        action: string,
        tooltip: string,
        icon: React.ReactElement
    }
}

const BarItem: React.FC<ItemProps> = ({item}) => {
    const {playground} = useStores()
    const {reference, toggle, animate, show, floating, position} = useTooltip()

    const actionList : StringKeys = {
        "newProject": () => playground.togglePrimaryModal(),
        "saveProject": () => playground.toggleDownloadModal(),
        "infoProject": () => {},
        "GitHub": () => {},
    }

    return (
        <>
            <motion.li
                onClick={actionList[item.action]}
                whileTap={{scale: 0.94}}
                ref={reference}
                className={style.item}
                onMouseOver={toggle.MouseOver}
                onMouseOut={toggle.MouseOut}
            >
                {item.icon}
            </motion.li>
            <motion.div
                initial={false}
                variants={animate}
                animate={show ? 'visible' : 'hidden'}
                ref={floating}
                className={style.tooltip}
                style={position}>
                <span>{item.tooltip}</span>
            </motion.div>
        </>
    )
}

export default InstrumentsBar