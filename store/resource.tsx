import React from 'react'
import {makeAutoObservable} from "mobx";
import {TResource, TResponse} from "../types/main";
import toast from 'react-hot-toast';

export class resource {
    private index: number =  1;
    public elements: Array<TResource> = []

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    public push = (data: Array<TResponse>) => {
        data.map(item => {
            this.elements.push({
                id: this.index,
                ...item,
            })
            this.index++;
        })
        toast.success(`Загружены новые ресурсы`)
    }

    public clear = () => {
        this.elements = []
    }
}