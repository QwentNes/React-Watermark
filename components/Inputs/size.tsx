import * as React from 'react';
import style from "./Inputs.module.scss";
import classNames from "classnames";

interface SizeProps {
    value: {
        width: number,
        height: number
    }
    setState: (width: number, height: number) => void
}

const Size: React.FC<SizeProps> = ({value, setState}) => {

    const [size, setSize] = React.useState<{ width: number, height: number }>({width: Math.round(value.width), height: Math.round(value.height)})

    const validate = (value: string | null | undefined, prev: number): number => {
        let num = Number(value)
        if(isNaN(num)){
            return prev
        }
        return num < 60 ? 60 : Number(value)
    }

    const handleChange = (data: { width?: string | null, height?: string | null }): void => {
        setSize(prev => ({
            width: validate(data.width, prev.width),
            height: validate(data.height, prev.height)
        }))
    }

    React.useEffect(() => {
        setState(size.width, size.height)
    }, [size])

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