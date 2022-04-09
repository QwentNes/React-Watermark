import * as React from 'react';
import classNames from "classnames/bind";
import style from "./Inputs.module.scss";
import {Range} from 'react-range';


interface SliderProps {

}

const Slider: React.FC<SliderProps> = ({}) => {
    const [values, setValue] = React.useState<number>(50)
    return (
        <div className={classNames(style.effect_parameter, style.parameter_bottom)}>
            <div className={style.range_block}>
                <Range step={1}
                       min={0}
                       max={100}
                       values={[values]}
                       onChange={(values) => setValue(values[0])}
                       renderTrack={({props, children}) => (
                           <div className={style.line}
                                {...props}
                                style={{
                                    ...props.style,
                                    width: '100%',
                                }}
                           >
                               {children}
                           </div>
                       )}
                       renderThumb={({props}) => (
                           <div className={style.pointer}
                                {...props}
                                style={{
                                    ...props.style,
                                }}
                           >
                               <div className={style.counter}>
                                   <span>{values}</span>
                               </div>
                           </div>
                       )}
                />
                <span className={style.max_range}>100</span>
            </div>
        </div>
    );
};

export default Slider


