import * as React from 'react';
import style from "./Resource.module.scss";
import Image from "next/image";
import DragAndDrop from "../DragAndDrop";

interface ResourceProps {

}

const Resource: React.FC<ResourceProps> = ({}) => {
    const loader = ({src} : any) => {
        return src
    }

    return (
        <>
            {/*actionDrop*/}
            <DragAndDrop>
                <div className={style.header}>
                    <div className={style.title}>
                        <span>Исходные файлы</span>
                    </div>
                    <div className={style.toggle}>
                        <button className={style.left_btn}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M13.2599 16.2802C13.0699 16.2802 12.8799 16.2102 12.7299 16.0602L9.19992 12.5302C8.90992 12.2402 8.90992 11.7602 9.19992 11.4702L12.7299 7.94016C13.0199 7.65016 13.4999 7.65016 13.7899 7.94016C14.0799 8.23016 14.0799 8.71016 13.7899 9.00016L10.7899 12.0002L13.7899 15.0002C14.0799 15.2902 14.0799 15.7702 13.7899 16.0602C13.6499 16.2102 13.4599 16.2802 13.2599 16.2802Z"/>
                            </svg>
                        </button>
                        <button className={style.right_btn}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M10.7397 16.2802C10.5497 16.2802 10.3597 16.2102 10.2097 16.0602C9.91969 15.7702 9.91969 15.2902 10.2097 15.0002L13.2097 12.0002L10.2097 9.00016C9.91969 8.71016 9.91969 8.23016 10.2097 7.94016C10.4997 7.65016 10.9797 7.65016 11.2697 7.94016L14.7997 11.4702C15.0897 11.7602 15.0897 12.2402 14.7997 12.5302L11.2697 16.0602C11.1197 16.2102 10.9297 16.2802 10.7397 16.2802Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={style.grid}>
                    <Image loader={loader} src={`https://images.pexels.com/photos/7359778/pexels-photo-7359778.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`} width={120} height={100} objectFit={`cover`} />
                    <Image loader={loader} src={`https://images.pexels.com/photos/3287050/pexels-photo-3287050.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`} width={120} height={100} objectFit={`cover`} />
                    <Image loader={loader} src={`https://images.pexels.com/photos/7891013/pexels-photo-7891013.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`} width={120} height={100} objectFit={`cover`} />
                    <Image loader={loader} src={`https://images.pexels.com/photos/7237616/pexels-photo-7237616.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`} width={120} height={100} objectFit={`cover`} />
                </div>
            </DragAndDrop>
        </>
    );
};

export default Resource