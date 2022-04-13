import React from 'react'
import {makeAutoObservable} from "mobx";
import {TPlayground} from "../types/main";

export class playground{

    public config : TPlayground = {
        link: "https://images.pexels.com/photos/2537391/pexels-photo-2537391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        size:{
            width: 1880,
            height: 1250,
        },
        scale: 0.65,
        edit: -1,
    }

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    public setScale = (value : number) : void => {
        this.config.scale = value
    }

    public setEdit = (value : number) : void => {
        this.config.edit = value
    }

}