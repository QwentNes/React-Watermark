import * as React from 'react';
import {string} from "prop-types";

type TStateScale = {
    value: number,
    set: (v: number) => void
}

type TStateEdit = {
    value: number | null,
    set: (v: number | null) => void
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

type editing = {
    item: TStateEdit,
    config: TConfig | null,
}

type TItem = {

    current: TConfig
}

export type TResource = {
    id: number,
    link: string,
    size: TSizeElement
}

export type TResponse = {
    link: string,
    size: TSizeElement
}

export type ProxyElement = {
    id: number,
    initial: {
        link: string,
        size: TSizeElement
    },
    current: TConfig
}

export type TMousePosition = {
    x: number,
    y: number
}

export type TPlayground = {
    project: string,
    link: string,
    size: TSizeElement,
    scale: number,
    edit: number
}

export type TConfigLoader = {
    width: number,
    height: number,
    quality: number
}

export type TImageWorkspace = {
    name: string,
    link: string,
    size: TSizeElement
}

export type StringKeys = {
    [key: string]: any;
}

export type TProject = {
    name: string,
    image: string,
    size: TSizeElement,
}

export type TLayer = {
    id: number,
    mode: string,
    image: string,
    opacity: number,
    size: TSizeElement,
    position: TPositionElement,
    zIndex: number
}

export type TProcessImage = {
    project: TProject,
    layers: Array<TLayer>
}