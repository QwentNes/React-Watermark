import {useStores} from "./useStores";
import {TLayer, TProcessImage, TProject} from "../types/main";

export function useDataProject(save:boolean = true) {
    const {watermarks, playground} = useStores()

    const Data = (): TProcessImage => {
        const project: TProject = {
            save: save,
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

    const dataRequest:TProcessImage = {project: Data().project, layers: Data().layers}

    return {Data, dataRequest}
}