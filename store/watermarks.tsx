import React from 'react'
import {makeAutoObservable} from "mobx";
import {ProxyElement, TResource} from "../types/main";

const POSITION_TOP = "position_top"
const POSITION_LEFT = "position_left"
const SIZE_WIDTH = "size_width"
const SIZE_HEIGHT = "size_height"
const MODE = "mode"
const OPACITY = "opacity"
const ZINDEX = "zIndex"


export class watermarks {
    private index = 1;

    public list: Array<ProxyElement> = []

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    public push = (data: TResource): void => {
        let newElement: ProxyElement = {
            id: this.index++,
            initial: {
                link: data.link,
                size: {
                    width: data.size.width,
                    height: data.size.height
                }
            },
            current: {
                mode: 'normal',
                opacity: 1,
                position: {
                    top: 0,
                    left: 0,
                },
                size: {
                    width: data.size.width,
                    height: data.size.height
                },
                zIndex: 1,
            }
        }
        this.list.push(newElement)
    }

    public find = (id: number): ProxyElement | undefined => {
        let result: ProxyElement | undefined = this.list.filter(element => {
            element.id == id
        })[0];

        return result;
    }

    public setParam = (id: number, param: string, value: any): void => {
        const item = this.find(id)?.current;
        if(typeof item != 'undefined'){
            switch (param) {
                case POSITION_TOP:
                    item.position.top = value
                    break;
                case POSITION_LEFT:
                    item.position.left = value
                    break;
                case SIZE_WIDTH:
                    item.size.width = value
                    break;
                case SIZE_HEIGHT:
                    item.size.height = value
                    break;
                case MODE:
                    item.mode = value
                    break;
                case OPACITY:
                    item.opacity = value
                    break;
                case ZINDEX:
                    item.zIndex = value
                    break;
            }
        }
    }

    public delete = (id: number): void => {
        this.list = this.list.filter(item => item.id !== id);
    }

}