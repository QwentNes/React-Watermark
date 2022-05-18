import React from 'react'
import {makeAutoObservable} from "mobx";
import {TImageWorkspace, TPlayground} from "../types/main";
import toast from 'react-hot-toast';

export class playground {
    public primaryModal: boolean = true
    public downloadModal: boolean = false
    public theme: string = 'dark'

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

    public setTheme = (value: string): void => {
        this.theme = value;
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
        if(this.config.project != ""){
            this.downloadModal = !this.downloadModal;
            return;
        }
        toast.error("Проект не инициализирован");
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