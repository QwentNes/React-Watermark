import {useDataProject} from "./useDataProject";
import {useMutation} from "react-query";
import {TProcessImage} from "../types/main";
import {UploadResource} from "../service/uploadResource";
import toast from "react-hot-toast";
import { useStores } from "./useStores";

export function useSaveProject() {
    const {Data} = useDataProject()
    const {playground, resource, watermarks} = useStores()

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
        await mutateAsync(Data())
    }

    const finishProject = () => {
        playground.toggleDownloadModal()
        playground.clear()
        resource.clear()
        watermarks.clear()
        toast.success("Проект завершен")
    }

    const events = {
        "onClickProcess": () => processImage(),
        "clearProject": () => finishProject(),
    }

    return {events, isLoading}
}