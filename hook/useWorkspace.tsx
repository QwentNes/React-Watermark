import React, {useCallback} from 'react';
import Watermark from '../components/Watermark';
import {useMousePosition} from './useMousePosition';
import {ProxyElement} from '../types/main';

export function useWorkspace(elements: Array<ProxyElement>, edit: number) {
    const workSpaceRef = React.useRef(null) as React.MutableRefObject<any>
    const mousePosition = useMousePosition(workSpaceRef);

    const WatermarkElements = useCallback(
        () => {
            return (
                <>
                    {
                        elements.map((item, index) => {
                            return <Watermark id={item.id} key={`watermark_` + index}/>
                        })
                    }
                </>
            )
        },
        [elements]
    )

    return {workSpaceRef, mousePosition, WatermarkElements}
}