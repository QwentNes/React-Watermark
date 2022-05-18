import React from 'react';
import { useStores } from './useStores';
import { TargetAndTransition } from 'framer-motion';
import {TImageWorkspace, TMousePosition} from '../types/main';
import { useDimensions } from './useDimensions';
import {useMutation} from "react-query";
import {UploadResource} from "../service/uploadResource";
import toast from "react-hot-toast";

export function usePlayground(innerRef: React.RefObject<HTMLDivElement>, position: TMousePosition) {
    const {playground, watermarks} = useStores()
    const {mutateAsync, isLoading} = useMutation('createProject', (data: FormData) => UploadResource.Project(data), {
        onSuccess: ({data}) => {
            try{
                let projectParse:TImageWorkspace = JSON.parse(JSON.stringify(data))
                playground.setWorkspace(projectParse)
            }
            catch {
                toast.error("Произошла ошибка")
            }
        },
        onError: () => {
            toast.error("Не удалось инициализировать проект")
        },
    })
    React.useEffect(() => {
        if(playground.tempData != null){
            playground.clear()
            watermarks.clear()
            sendProject(playground.tempData).then()
            playground.clearTempData()
        }
    }, [playground.tempData])

    const sendProject = async (project: FormData) => {
        await mutateAsync(project)
    }

    const data = playground.config;
    const scale = data.scale;
    const scrollBlockRef = React.useRef(null) as React.MutableRefObject<any>

    const [sizer, setSizer] = React.useState({
        width: data.size.width * scale,
        height: data.size.height * scale,
    })

    const dimensions = useDimensions(innerRef, [sizer])

    React.useEffect(() => {
        const scrollRef = scrollBlockRef.current
        const Resizer = (e: React.WheelEvent): void => {
            if (e.ctrlKey || e.altKey) {
                e.preventDefault()
                const x = position.x !== 0 ? position.x : scrollBlockRef.current.scrollLeft + scrollBlockRef.current.clientWidth / 2;
                const y = position.y !== 0 ? position.y : scrollBlockRef.current.scrollTop + scrollBlockRef.current.clientHeight / 2;

                const left = Math.ceil((x / dimensions.prevWidth) * dimensions.width - x);
                const top = Math.ceil((y / dimensions.prevHeight) * dimensions.height - y);

                scrollBlockRef.current.scrollBy({left, top});
                let scaleResult = scale + (e.deltaY > 0 ? -0.05 : 0.05);


                if (scaleResult > 0.3) {
                    setSizer({
                        width: data.size.width * scaleResult,
                        height: data.size.height * scaleResult,
                    })

                    playground.setScale(scaleResult)
                }
            }
        }

        scrollRef.addEventListener("wheel", Resizer)

        return () => scrollRef.removeEventListener("wheel", Resizer)
    }, [sizer])

    React.useEffect(() => {
        setSizer({
            width: data.size.width * playground.config.scale,
            height: data.size.height * playground.config.scale,
        })
    }, [playground.config.project])

    const playgroundSize:React.CSSProperties = {
        width: sizer.width,
        height: sizer.height,
    }

    const playgroundAnimate:TargetAndTransition = {
        width: data.size.width,
        height: data.size.height,
        scale: scale,
        transition: {
            type: "Inertia",
            duration: 0.2
        }
    }

    const image = {
        src: data.link,
        width: data.size.width,
        height: data.size.height
    }
    // :D жоско

    return {scrollBlockRef, playgroundSize, playgroundAnimate, image, isLoading}
}