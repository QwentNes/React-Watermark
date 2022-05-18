import React from 'react'
import {useStores} from "./useStores";
import {useMutation} from "react-query";
import {TLayer, TProcessImage, TProject} from "../types/main";
import {UploadResource} from "../service/uploadResource";
import toast from "react-hot-toast";

export function useSaveProject() {
    const {watermarks, playground} = useStores()
    const {mutateAsync, isLoading} = useMutation('processImage', (data: TProcessImage) => UploadResource.Process(data), {
        onSuccess: ({data}) => {
            let downloadElement = document.createElement('a');
            downloadElement.setAttribute('href', 'https://api.watermarker.space/'+data.link+'?download');
            downloadElement.setAttribute('download', 'https://api.watermarker.space/'+data.link+'?download');
            downloadElement.click();
        },
        onError: () => {
            toast.error("Произошла ошибка сервера")
        },
    })

    const processImage = async () => {
        await mutateAsync(getData())
    }

    const getData = (): TProcessImage => {
        const project: TProject = {
            name: playground.config.project,
            image: playground.config.link,
            size: {
                width: Math.round(playground.config.size.width),
                height: Math.round(playground.config.size.height)
            }
        }

        const layers: Array<TLayer> = []
        watermarks.list.map((item) => {
            let itemData: TLayer = ({
                id: item.id,
                mode: item.current.mode,
                image: item.initial.link,
                opacity: item.current.opacity,
                size: {
                    width: Math.round(item.current.size.width),
                    height: Math.round(item.current.size.height)
                },
                position: {
                    top: Math.round(item.current.position.top),
                    left: Math.round(item.current.position.left),
                },
                zIndex: item.current.zIndex
            })
            layers.push(itemData)
        })

        return {project: project, layers: layers}
    }

    const events = {
        "onClickProcess": () => processImage()
    }

    return {events, isLoading}
}