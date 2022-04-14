import * as React from 'react';
import style from "./Inputs.module.scss";
import {useFloating} from '@floating-ui/react-dom';
import {motion} from 'framer-motion';

interface SelectProps {
    setState: (value : string) => void,
    mode?: string,
}

const Select: React.FC<SelectProps> = ({setState, mode}) => {
    const allVariants = [
        {
            name: "Стандарт",
            mode: "normal"
        },
        {
            name: "Черно-белое",
            mode: "black"
        },
        {
            name: "Инвертировать",
            mode: "invert"
        },
        {
            name: "Контраст",
            mode: "contrast"

        },
        {
            name: "Размыть",
            mode: "blur"
        }
    ]
    let activeNumber = 0;

    if(mode){
        allVariants.map((item, index) => {
            if(item.mode == mode){
                activeNumber = index
            }
        })
    }

    const [show, setShow] = React.useState<boolean>(false)
    const [active, setActive] = React.useState<number>(activeNumber)

    React.useEffect(() => {
        setState(allVariants[active].mode)
    }, [active])

    const {x, y, reference, floating} = useFloating({
        placement: 'bottom-start',
    });

    return (
        <div className={style.effect_parameter}>
            <div className={style.selected} ref={reference} onClick={() => setShow(!show)}>
                <span>{allVariants[active].name}</span>
                <motion.div className={style.icon_dropdown} animate={{rotate: show ? '90deg' : '0deg'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="m8.76314,20.46738c-0.37626,0 -0.75252,-0.13649 -1.04957,-0.42896c-0.57431,-0.56545 -0.57431,-1.50135 0,-2.0668l5.94095,-5.84943l-5.94095,-5.84951c-0.57431,-0.56545 -0.57431,-1.50135 0,-2.0668c0.57429,-0.56545 1.52484,-0.56545 2.09913,0l6.99051,6.88291c0.57429,0.56545 0.57429,1.50135 0,2.0668l-6.99051,6.88283c-0.29705,0.29247 -0.67331,0.42896 -1.04957,0.42896z"/>
                    </svg>
                </motion.div>
            </div>
            {show &&
                <ul style={{top: y ?? 0, left: x ?? 0}} className={style.select_list} ref={floating}>
                    {
                        allVariants.map((item, index) => {
                            if (index != active) {
                                return <li
                                    key={`variant_` + index}
                                    onClick={() => {
                                        setActive(index)
                                        setShow(false)
                                    }
                                    }>
                                    {item.name}
                                </li>
                            }
                        })
                    }
                </ul>
            }
        </div>
    );
};

export default Select