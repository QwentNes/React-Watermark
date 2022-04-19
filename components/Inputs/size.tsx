import * as React from 'react';
import style from "./Inputs.module.scss";
import classNames from "classnames";
import { observer } from 'mobx-react-lite';
import { ProxyElement } from '../../types/main';

interface SizeProps {
    element: ProxyElement,
    setGlobal: (width: number, height: number) => void;
}

const Size: React.FC<SizeProps> = observer(({element, setGlobal}) => {
    let width = Math.round(element.current.size.width)
    let height = Math.round(element.current.size.height)

    const [size, setSize] = React.useState<{ width: number, height: number }>({
        width: width,
        height: height
    })

    React.useEffect( () => {
        setSize({
            width: width,
            height: height
        })
    }, [width, height])


    return (
        <div className={classNames(style.effect_parameter, style.effect_size)}>
            <input
                disabled={true}
                type={"text"}
                value={size.width}
                maxLength={4}
            />
            <span className={style.separator}>x</span>
            <input
                disabled={true}
                type={"text"}
                value={size.height}
                maxLength={4}
            />
        </div>
    );
});

export default Size