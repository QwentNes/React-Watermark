import { motion } from 'framer-motion'
import React, {useCallback} from 'react'
import {Select, Size, Slider} from '../components/Inputs'
import {useStores} from './useStores'

export function useParametersInput() {
    const {watermarks, playground} = useStores()
    const elementId = playground.config.edit
    const element = watermarks.find(elementId)

    const isShow = typeof element != 'undefined'

    const SizeInput = () => {
        return isShow ? <Size
            element={element}
            setGlobal={(width: number, height: number) => {
                watermarks.setParam(elementId, 'size_width', width)
                watermarks.setParam(elementId, 'size_height', height)
            }}/> : <></>
    }

    const SelectInput = () => {
        return isShow ? <Select
            mode={element.current.mode}
            setState={(value: string) => {
                watermarks.setParam(elementId, "mode", value)
            }}/> : <></>
    }

    const SliderInput = () => {
        return isShow ? <Slider
            value={element.current.opacity}
            setState={(value: number) => {
                watermarks.setParam(elementId, "opacity", value)
            }}
        /> : <></>
    }

    const deleteBtn = () => {
        watermarks.delete(elementId)
        playground.setEdit(-1)
    }

    return {isShow, deleteBtn, SizeInput, SelectInput, SliderInput}
}