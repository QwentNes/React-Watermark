import React from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { UploadResource } from '../service/uploadResource';
import { useStores } from './useStores';
import {TResponse} from "../types/main";

export function useUploadResource() {
    const {resource} = useStores()

    const {mutateAsync, isLoading} = useMutation('uploadRes', (data: FormData) => UploadResource.All(data), {
        onSuccess: ({data}) => {
            try{
                let resourceParse:Array<TResponse> = JSON.parse(JSON.stringify(data))
                resource.push(resourceParse)
            }
            catch {
                toast.error("Произошла ошибка")
            }
        },
        onError: () => {
            toast.error("Произошла ошибка")
        },
    })

    const sendFiles = async (acceptedFiles: Array<File>) => {
        if (!(acceptedFiles.length > 5)) {
            let DropFiles = new FormData()

            acceptedFiles.map((item, index) => {
                DropFiles.append(`file_${index}`, acceptedFiles[index])
            })

            await mutateAsync(DropFiles)
        }
        else {
            toast.error("Превышено ограничение загрузки")
        }
    }

     return {sendFiles, isLoading}
}