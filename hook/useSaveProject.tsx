import {useDataProject} from "./useDataProject";
import {useMutation} from "react-query";
import {TProcessImage} from "../types/main";
import {UploadResource} from "../service/uploadResource";
import toast from "react-hot-toast";

export function useSaveProject() {
    const {Data} = useDataProject()

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

    const events = {
        "onClickProcess": () => processImage()
    }

    return {events, isLoading}
}