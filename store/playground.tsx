import React from 'react'
import {makeAutoObservable} from "mobx";
import {TImageWorkspace, TPlayground} from "../types/main";

export class playground {
    public primaryModal: boolean = false
    public downloadModal: boolean = false

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
    public tempData: FormData | null = null

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    public setScale = (value: number): void => {
        this.config.scale = Number(value.toFixed(2))
    }

    public setEdit = (value: number): void => {
        this.config.edit = value
    }

    public clearTempData = () => {
        this.tempData = null
    }

    public togglePrimaryModal(){
        this.primaryModal = !this.primaryModal
    }

    public toggleDownloadModal(){
        this.downloadModal = !this.downloadModal
    }

    public setWorkspace = (data: TImageWorkspace): void => {
        this.config = {
            ...this.config,
            project: data.name,
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

    public send = (data: FormData) => {
        this.clear()
        this.togglePrimaryModal()
        this.tempData = data
    }
}