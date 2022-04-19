import React from 'react'
import {makeAutoObservable} from "mobx";
import {TPlayground} from "../types/main";

export class playground {

    public config: TPlayground = {
        link: "https://images.pexels.com/photos/8640688/pexels-photo-8640688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        size: {
            width: 2000,
            height: 2000,
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
}