import { useStores } from "./useStores"
import { TProcessImage, TProjectProps } from "../types/main"
import { useDataProject } from "./useDataProject"
import { useMutation, useQuery } from "react-query"
import { UploadResource } from "../service/uploadResource";
import { useCallback, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export function usePropertiesProject() {
    const { playground, watermarks } = useStores()
    const [sizeProject, setSizeProject] = useState<string | null>(null)
    const { dataRequest } = useDataProject(false) //check
    const watermarksList = watermarks.list
    
    const {isFetching} = useQuery('size_project', () => UploadResource.Process(dataRequest), {
        onSuccess: ({ data }) => {
            setSizeProject(data.size)
        },
        onError: () => {
            setSizeProject("Произошла ошибка")
        },
    })

    console.log(isFetching)

    const projectProps: Array<TProjectProps> = [
        {
            "name": "Название проекта",
            "action": playground.config.project
        },
        {
            "name": "Размер проекта",
            "action": playground.config.size.width + 'x' + playground.config.size.height
        },
        {
            "name": "Расчетный вес",
            "action": isFetching ?
            <SkeletonTheme baseColor="#22222A" highlightColor="#1B1B23">
                <Skeleton style={{height: '100%', width: '65px'}} count={1} />
            </SkeletonTheme> : sizeProject
        }
    ]

    return { projectProps, watermarksList }
}