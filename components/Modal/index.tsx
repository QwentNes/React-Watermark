import * as React from 'react';
import style from "./Modal.module.scss";
import {motion, AnimatePresence} from "framer-motion";

interface ModalProps {
    innerKey: string,
    show: boolean,
    size: number,
}

const ModalWrap: React.FC<Pick<ModalProps, "show">> = ({children, show}) => {
    return(
        <AnimatePresence>
            {
                show && <motion.div 
                            exit={{opacity: 0}} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={style.modal_wrap}>
                    {children}
                </motion.div>
            }
        </AnimatePresence>
    
    )
}

const Modal: React.FC<ModalProps> = ({children, show, size, innerKey}) => {
    return (
        <AnimatePresence>
            {
                show && <motion.div 
                            key={innerKey} 
                            className={style.modal} 
                            style={{width: size+`em`}}
                            initial={{ y: '-25px', opacity: 0 }}
                            animate={{ y: '0', opacity: 1 }}
                            exit={{ y: '-25px'}}
                            transition={{type: 'tween'}}>
                                {children}
                        </motion.div>
            }
        </AnimatePresence>
    );
};

const HeaderBlock: React.FC = ({children}) => {
    return(
        <div className={style.header}>
            {children}
        </div>
    )
}

type CloseBtnProps = {
    click: () => void
}

const CloseBtn: React.FC<CloseBtnProps> = ({click}) => {
    return (
        <motion.div
            onClick={click}
            className={style.close}
            whileTap={{scale: 0.95}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path d="m15.46058,11.88777l7.51869,-7.62738c0.97147,-0.98547 0.97147,-2.58226 0,-3.56774c-0.97143,-0.98547 -2.54547,-0.98547 -3.51686,0l-7.51869,7.62823l-7.51869,-7.62738c-0.97143,-0.98547 -2.54547,-0.98547 -3.5169,0s-0.97143,2.58226 0,3.56774l7.51869,7.62738l-7.51869,7.62738c-0.97143,0.98547 -0.97143,2.58226 0,3.5677c0.97143,0.98551 2.54547,0.98551 3.5169,0l7.51869,-7.62734l7.51869,7.62734c0.97143,0.98551 2.54547,0.98551 3.51686,0c0.97147,-0.98547 0.97147,-2.58226 0,-3.5677l-7.51869,-7.62823z"/>
            </svg>
        </motion.div>
    )
}

const Title: React.FC = ({children}) => {
    return(
        <div className={style.title}>
           {children}
        </div>
    )
}

const Prefix: React.FC = ({children}) => {
    return (
        <div className={style.prefix}>
            <span>{children}</span>
        </div>
    )
}

const Warning: React.FC = ({}) => {
    return (
        <div className={style.warning}>
            <div className={style.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path d="M20.4098 6.96141V8.79141C20.4098 9.43141 20.1098 10.0314 19.5898 10.4014L8.58984 18.4614C7.87984 18.9814 6.90984 18.9814 6.20984 18.4514L4.76984 17.3714C4.11984 16.8814 3.58984 15.8214 3.58984 15.0114V6.96141C3.58984 5.84141 4.44984 4.60141 5.49984 4.21141L10.9698 2.16141C11.5398 1.95141 12.4598 1.95141 13.0298 2.16141L18.4998 4.21141C19.5498 4.60141 20.4098 5.84141 20.4098 6.96141Z"/>
                    <path d="M18.8216 12.3414C19.4816 11.8614 20.4116 12.3314 20.4116 13.1514V15.0314C20.4116 15.8414 19.8816 16.8914 19.2316 17.3814L13.7616 21.4714C13.2816 21.8214 12.6416 22.0014 12.0016 22.0014C11.3616 22.0014 10.7216 21.8214 10.2416 21.4614L9.41157 20.8414C8.87157 20.4414 8.87157 19.6314 9.42157 19.2314L18.8216 12.3414Z"/>
                </svg>
            </div>
            <div className={style.wrap}>
                <div className={style.warn_title}>
                    Мы не собираем личные данные
                </div>
                <div className={style.warn_description}>
                    В целях вашей безопасности, все исходные медиафайлы будут удалены с сервера после того,
                    как проект будет завершен.
                </div>
            </div>
        </div>
    )
}

const Content: React.FC = ({children}) => {
    return (
        <div className={style.content}>
            {children}
        </div>
    )
}

export {ModalWrap, Modal, HeaderBlock, Title, CloseBtn, Prefix, Warning, Content}