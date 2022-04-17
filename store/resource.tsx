import React from 'react'
import {makeAutoObservable} from "mobx";
import {TResource, TResponse} from "../types/main";

export class resource {
    private index: number =  1;
    public list: Array<TResource> = []

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    public push = (data: Array<TResponse>) => {
        data.map(item => {
            this.list.push({
                id: this.index,
                ...item,
            })
            this.index++;
        })
    }
}