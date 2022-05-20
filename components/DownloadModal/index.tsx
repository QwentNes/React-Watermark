import * as React from 'react';
import style from './DownloadModal.module.scss';
import {Modal, HeaderBlock, Title, Prefix, Content, CloseBtn} from "../Modal/";
import { motion } from 'framer-motion';
import { useSaveProject } from '../../hook/useSaveProject';
import { useStores } from '../../hook/useStores';
import { observer } from 'mobx-react-lite';

const DownloadModal: React.FC = observer(({}) => {
    const {playground} = useStores()
    const {events, isLoading} = useSaveProject()

    return (
        <Modal size={28.5} show={playground.downloadModal} innerKey={`download`}>
            <HeaderBlock>
                <Title>
                    <span>Сохранение проекта</span>
                    <CloseBtn click={() => playground.toggleDownloadModal()} />
                </Title>
                <Prefix>После обработки, готовый результат будет загружен автоматически</Prefix>
            </HeaderBlock>
            <Content>
                <div className={style.download_block}>
                    <div className={style.layer_block}>
                        <span>{playground.config.project}</span>
                    </div>
                    <DownloadBtn isLoading={isLoading} click={events.onClickProcess} />
                </div>
                <div className={style.btn_group}>
                    <motion.button whileTap={{scale: 0.97}} className={style.apply} onClick={events.clearProject}>Завершить проект</motion.button>
                </div>
            </Content>
        </Modal>
    );
});

interface DownloadBtnProps{
    isLoading: boolean,
    click: () => void,
}

const DownloadBtn: React.FC<DownloadBtnProps> = ({isLoading, click}) => {
    const svgIconAnim = {
        loading: {
            opacity: 0,
            scale: 0.5,
        },
        normal: {
            opacity: 1,
            scale: 1
        }
    }

    const loaderAnim = {
        loading: {
            opacity: 1,
            transition: {
                delay: 0.3
            }
        },
        normal: {
            opacity: 0,
        }
    }

    return (
        <motion.div initial={false} className={style.btn} onClick={click} animate={isLoading ? 'loading' : 'normal'}>
            <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" variants={svgIconAnim}>
                <path d="M9 17.75C8.9 17.75 8.81 17.73 8.71 17.69C8.43 17.58 8.25 17.3 8.25 17V11C8.25 10.59 8.59 10.25 9 10.25C9.41 10.25 9.75 10.59 9.75 11V15.19L10.47 14.47C10.76 14.18 11.24 14.18 11.53 14.47C11.82 14.76 11.82 15.24 11.53 15.53L9.53 17.53C9.39 17.67 9.19 17.75 9 17.75Z"/>
                <path d="M8.99945 17.7499C8.80945 17.7499 8.61945 17.6799 8.46945 17.5299L6.46945 15.5299C6.17945 15.2399 6.17945 14.7599 6.46945 14.4699C6.75945 14.1799 7.23945 14.1799 7.52945 14.4699L9.52945 16.4699C9.81945 16.7599 9.81945 17.2399 9.52945 17.5299C9.37945 17.6799 9.18945 17.7499 8.99945 17.7499Z"/>
                <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H14C14.41 1.25 14.75 1.59 14.75 2C14.75 2.41 14.41 2.75 14 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z"/>
                <path d="M22 10.75H18C14.58 10.75 13.25 9.41999 13.25 5.99999V1.99999C13.25 1.69999 13.43 1.41999 13.71 1.30999C13.99 1.18999 14.31 1.25999 14.53 1.46999L22.53 9.46999C22.74 9.67999 22.81 10.01 22.69 10.29C22.57 10.57 22.3 10.75 22 10.75ZM14.75 3.80999V5.99999C14.75 8.57999 15.42 9.24999 18 9.24999H20.19L14.75 3.80999Z"/>
            </motion.svg>
            <motion.div className={style.loader} variants={loaderAnim}>
                <div /><div /><div/>
            </motion.div>
        </motion.div>
    )
}

export default DownloadModal