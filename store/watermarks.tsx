import React from 'react'
import {makeAutoObservable} from "mobx";
import {ProxyElement} from "../types/main";

const POSITION_TOP = "position_top"
const POSITION_LEFT = "position_left"
const SIZE_WIDTH = "size_width"
const SIZE_HEIGHT = "size_height"
const MODE = "mode"
const OPACITY = "opacity"
const ZINDEX = "zIndex"



export class watermarks {
    public list: Array<ProxyElement> = [
        {
            id: 1,
            initial: {
                link: "https://avatars.mds.yandex.net/get-zen_doc/3323369/pub_5ef21f5a41bbd50e24962d59_5ef21fa0bd439c08df624991/scale_1200",
                size: {
                    width: 250,
                    height: 250,
                },
            },
            current: {
                mode: 'normal',
                opacity: 1,
                position: {
                    top: 550,
                    left: 250,
                },
                size: {
                    width: 550,
                    height: 550,
                },
                zIndex: 1,
            },
        },

    ]

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    public find = (id: number): ProxyElement | undefined => {
        let result: ProxyElement | undefined;
        this.list.map(item => {
            if (item.id == id) {
                result = item;
            }
        })
        return result;
    }

    public setParam = (id: number, param: string, value: any): void => {
        const item = this.list[id - 1].current;
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

    public delete = (id: number): void => {
        this.list = this.list.filter(item => item.id !== id);
    }

}