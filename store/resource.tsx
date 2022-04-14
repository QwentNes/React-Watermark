import React from 'react'
import {makeAutoObservable} from "mobx";
import {TPlayground} from "../types/main";

export class resource{

    public list = [
        {
            link: "https://images.pexels.com/photos/2537391/pexels-photo-2537391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            size:{
                width: 520,
                height: 190,
            }
        },
    ]

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

}