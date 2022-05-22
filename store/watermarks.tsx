import React from 'react'
import { makeAutoObservable } from "mobx";
import { ProxyElement, TMaxSizeWatermark, TResource } from "../types/main";
import toast from 'react-hot-toast';

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
        makeAutoObservable(this, {}, { deep: true })
    }

    public clear = (): void => {
        this.list = [];
    }

    public push = (data: TResource, deps: TMaxSizeWatermark): void => {
        let wScale = deps.maxWidth / data.size.width
        let hScale = deps.maxHeight / data.size.height
        let innerScale = Math.min(wScale, hScale)

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
                    width: data.size.width * innerScale,
                    height: data.size.height * innerScale,
                },
                zIndex: 1,
            }
        }

        innerScale < 1 && toast('Размер водяного знака был автоматически адаптирован под проект');
        this.list.length > 20 && toast('На рабочей области более 20 изображений. Это может снизить производительность вашего устройства', {
            duration: 6000,
            icon: '👀',
        });

        this.list.push(newElement)
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
        const item = this.find(id)?.current;
        if (typeof item != 'undefined') {
            switch (param) {
                case POSITION_TOP:
                    item.position.top = value
                    break;
                case POSITION_LEFT:
                    item.position.left = value
                    break;
                case SIZE_WIDTH:
                    if(value > 160)
                    item.size.width = value
                    break;
                case SIZE_HEIGHT:
                    if(value > 160)
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