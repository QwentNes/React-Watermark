import * as React from 'react';
import style from "./Inputs.module.scss";
import classNames from "classnames";

interface SizeProps {

}

const Size: React.FC<SizeProps> = ({}) => {

    const [size, setSize] = React.useState<{ width: number, height: number }>({width: 120, height: 60})

    const validate = (value: string | null | undefined, prev: number): number => {
        if(isNaN(Number(value))){
            return prev
        }
        return Number(value)
    }

    const handleChange = (data: { width?: string | null, height?: string | null }): void => {
        setSize(prev => ({
            width: validate(data.width, prev.width),
            height: validate(data.height, prev.height)
        }))
    }

    return (
        <div className={classNames(style.effect_parameter, style.effect_size)}>
            <input
                type={"text"}
                value={size.width}
                maxLength={4}
                onChange={(e) => handleChange({width: e.target.value})}
            />
            <span className={style.separator}>x</span>
            <input
                type={"text"}
                value={size.height}
                maxLength={4}
                onChange={(e) => handleChange({height: e.target.value})}
            />
        </div>
    );
};

export default Size