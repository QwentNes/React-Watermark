import React, {useCallback} from 'react';
import Watermark from '../components/Watermark';
import Editor from '../components/Editor';
import {useMousePosition} from './useMousePosition';
import {observer} from "mobx-react-lite"
import {useStores} from './useStores';
import {ProxyElement} from '../types/main';
import { isObservable } from 'mobx';

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