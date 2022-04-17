import React, {createRef} from 'react';
import style from "./Resource.module.scss";
import Image from "next/image";
import Dropzone from "react-dropzone";
import {motion} from 'framer-motion';
import {useStores} from "../../hook/useStores";
import {observer} from "mobx-react-lite";
import classNames from "classnames";

import {useMutation} from "react-query";
import {UploadResource} from "../../service/uploadResource";

interface ResourceProps {

}

const Resource: React.FC<ResourceProps> = observer(({}) => {
    const {resource} = useStores()
    const dropzoneRef = createRef() as React.RefObject<any>

    const {mutateAsync, isLoading} = useMutation('uploadRes', (data: FormData) => UploadResource.All(data), {
        onSuccess: (response) => {
            resource.push(JSON.parse(JSON.stringify(response.data)));
        },
    })

    const sendFiles = async (acceptedFiles: Array<File>) => {
        let DropFiles = new FormData()

        acceptedFiles.map((item, index) => {
            DropFiles.append(`file_${index}`, acceptedFiles[index])
        })

        await mutateAsync(DropFiles)
    }

    const openDialog = () => {
        if (dropzoneRef.current) {
            dropzoneRef.current.open()
        }
    }

    return (
        <>
            <Dropzone
                ref={dropzoneRef}
                noClick noKeyboard
                onDrop={acceptedFiles => sendFiles(acceptedFiles)}
                accept={"image/jpeg,image/png"}
            >
                {({getRootProps, getInputProps, isDragActive}) => {
                    return (
                        <div {...getRootProps({className: style.resource})}>
                            <GridResource isDragActive={isDragActive} isLoading={isLoading}/>
                            <div className={style.upload}>
                                <div className={style.tooltip}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M16.6791 20.8301C16.6691 20.8301 16.6491 20.8301 16.6391 20.8301H5.54906C2.60906 20.6201 1.28906 18.3601 1.28906 16.3401C1.28906 14.5401 2.33906 12.5401 4.62906 11.9901C3.98906 9.49008 4.52906 7.14008 6.15906 5.44008C8.00906 3.50008 10.9791 2.73008 13.5291 3.52008C15.8691 4.24008 17.5191 6.17008 18.1191 8.85008C20.1691 9.31008 21.7991 10.8601 22.4591 13.0001C23.1691 15.3301 22.5291 17.7201 20.7791 19.2501C19.6591 20.2601 18.1991 20.8301 16.6791 20.8301ZM5.56906 13.3501C5.55906 13.3501 5.55906 13.3501 5.54906 13.3501C3.64906 13.4901 2.77906 14.9501 2.77906 16.3401C2.77906 17.7301 3.64906 19.1901 5.58906 19.3301H16.6291C17.7891 19.3101 18.8991 18.9101 19.7591 18.1301C21.3191 16.7601 21.4291 14.8101 21.0091 13.4401C20.5891 12.0601 19.4191 10.5001 17.3791 10.2401C17.0491 10.2001 16.7891 9.95008 16.7291 9.62008C16.3291 7.22008 15.0291 5.56008 13.0791 4.96008C11.0491 4.34008 8.70906 4.95008 7.23906 6.48008C5.90906 7.87008 5.52906 9.79008 6.14906 11.9001C6.65906 11.9701 7.14906 12.1201 7.59906 12.3501C7.96906 12.5401 8.11906 12.9901 7.92906 13.3601C7.73906 13.7301 7.28906 13.8801 6.91906 13.6901C6.50906 13.4801 6.05906 13.3701 5.60906 13.3701C5.59906 13.3501 5.58906 13.3501 5.56906 13.3501Z"/>
                                        <path
                                            d="M15.85 10.67C15.57 10.67 15.31 10.52 15.18 10.25C14.99 9.87998 15.15 9.42998 15.52 9.23998C16.14 8.92998 16.83 8.75998 17.51 8.74998C17.91 8.73998 18.27 9.06998 18.27 9.48998C18.28 9.89998 17.95 10.25 17.53 10.25C17.07 10.26 16.6 10.37 16.18 10.58C16.07 10.64 15.96 10.67 15.85 10.67Z"/>
                                    </svg>
                                    <input {...getInputProps()} />
                                    <span>Перетащите медиафайл или нажмите кнопку</span>
                                    <motion.button
                                        whileTap={{scale: 0.95}}
                                        type="button"
                                        onClick={openDialog}
                                    >
                                        Загрузить
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Dropzone>
        </>
    );
});


interface GridProps {
    isDragActive: boolean;
    isLoading: boolean;
}

const GridResource: React.FC<GridProps> = observer(({isDragActive, isLoading}) => {
    const {resource, watermarks} = useStores()
    const [list, setList] = React.useState<number>(1);

    const loader = ({src}: any) => {
        return "http://localhost/Watermark_backend/"+src;
    }

    const activeBtn = {
        right: resource.list.length / 4 > list,
        left: list != 1,
    }

    return (
        <>
            <div className={style.header}>
                <div className={style.title}>
                    <span>Исходные файлы</span>
                </div>
                <div className={style.toggle}>
                    <button
                        className={classNames(style.left_btn, activeBtn.left && style.toggle_btn_active)}
                        onClick={() => activeBtn.left && setList((prev) => prev - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M13.2599 16.2802C13.0699 16.2802 12.8799 16.2102 12.7299 16.0602L9.19992 12.5302C8.90992 12.2402 8.90992 11.7602 9.19992 11.4702L12.7299 7.94016C13.0199 7.65016 13.4999 7.65016 13.7899 7.94016C14.0799 8.23016 14.0799 8.71016 13.7899 9.00016L10.7899 12.0002L13.7899 15.0002C14.0799 15.2902 14.0799 15.7702 13.7899 16.0602C13.6499 16.2102 13.4599 16.2802 13.2599 16.2802Z"/>
                        </svg>
                    </button>
                    <button
                        className={classNames(style.right_btn, activeBtn.right && style.toggle_btn_active)}
                        onClick={() => activeBtn.right && setList((prev) => prev + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M10.7397 16.2802C10.5497 16.2802 10.3597 16.2102 10.2097 16.0602C9.91969 15.7702 9.91969 15.2902 10.2097 15.0002L13.2097 12.0002L10.2097 9.00016C9.91969 8.71016 9.91969 8.23016 10.2097 7.94016C10.4997 7.65016 10.9797 7.65016 11.2697 7.94016L14.7997 11.4702C15.0897 11.7602 15.0897 12.2402 14.7997 12.5302L11.2697 16.0602C11.1197 16.2102 10.9297 16.2802 10.7397 16.2802Z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={style.grid}>
                {
                    isLoading && <div className={style.loader}>
                        <motion.div animate={{margin: 0, transition: {duration: 0.5}}} className={style.logo_loader}>
                            <Image src={`/chubrik_loader.gif`} width={100} height={100}/>
                        </motion.div>
                    </div>
                }
                {
                    resource.list.slice((list - 1) * 4, list * 4).map((item, index) => {
                        return <Image
                            onClick={() => watermarks.push(item)}
                            loader={loader}
                            src={item.link}
                            key={index}
                            width={120}
                            height={100}
                            objectFit={`cover`}
                        />
                    })
                }
            </div>
        </>
    )
});

export default Resource