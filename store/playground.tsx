import React from 'react'
import {makeAutoObservable} from "mobx";
import {TImageWorkspace, TPlayground} from "../types/main";

export class playground {
    public primaryModal: boolean = true
    public config: TPlayground = {
        project: "",
        link: "",
        size: {
            width: 0,
            height: 0,
        },
        scale: 0.65,
        edit: -1,
    }

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    public setScale = (value: number): void => {
        this.config.scale = Number(value.toFixed(2))
    }

    public setEdit = (value: number): void => {
        this.config.edit = value
    }

    public setWorkspace = (data: TImageWorkspace): void => {
        this.config = {
            ...this.config,
            link: data.link,
            size: data.size,
        }
    }

    public clear = (): void => {
        this.config = {
            ...this.config,
            link: "",
            size: {
                width: 0,
                height: 0,
            },
            edit: -1,
        }
    }

    public togglePrimaryModal(){
        this.primaryModal = !this.primaryModal
    }
}