import * as React from 'react';

type TStateScale = {
    value: number,
    set: ( v : number ) => void
}

type TStateEdit = {
    value: number | null,
    set: ( v : number | null ) => void
}

export type TMousePosition = {
    x: number,
    y: number
}

type TPositionElement = {
    top: number,
    left: number
}

type TSizeElement = {
    width: number,
    height: number
}


type TConfig = {
    mode: string,
    opacity: number,
    position: TPositionElement,
    size: TSizeElement,
    zIndex: number,
}

export type TPlayground = {
    link: string,
    size: TSizeElement,
    scale: number,
    edit: number
}

type editing = {
    item: TStateEdit,
    config: TConfig | null,
}

type TItem = {

    current: TConfig
}

export type ProxyElement = {
    id: number,
    initial: {
        link: string,
        size: TSizeElement
    },
    current: TConfig
}