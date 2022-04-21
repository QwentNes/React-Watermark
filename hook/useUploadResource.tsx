import React from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { UploadResource } from '../service/uploadResource';
import { useStores } from './useStores';

export function useUploadResource() {
    const {resource} = useStores()

    const {mutateAsync, isLoading} = useMutation('uploadRes', (data: FormData) => UploadResource.All(data), {
        onSuccess: (response) => {
            resource.push(JSON.parse(JSON.stringify(response.data))); //try
        },
        onError: (error) => {
            toast.error("Произошла ошибка")
        }
    })

    const sendFiles = async (acceptedFiles: Array<File>) => {
        if (!(acceptedFiles.length > 5)) {
            let DropFiles = new FormData()

            acceptedFiles.map((item, index) => {
                DropFiles.append(`file_${index}`, acceptedFiles[index])
            })

            await mutateAsync(DropFiles)
        } else {
            toast.error("Превышено ограничение загрузки")
        }
    }

     return {sendFiles, isLoading}
}