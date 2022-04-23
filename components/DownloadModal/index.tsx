import * as React from 'react';
import style from './DownloadModal.module.scss';
import {Modal, HeaderBlock, Title, Prefix, Content} from "../Modal/";
import { motion } from 'framer-motion';
import { useSaveProject } from '../../hook/useSaveProject';

interface ModalProps {
    show: boolean,
    close: () => void
}

const DownloadModal: React.FC<ModalProps> = ({show, close}) => {
    const {events} = useSaveProject()

    return (
        <Modal size={28.5} show={show}>
            <HeaderBlock>
                <Title>
                    <span>Сохранение проекта</span>
                </Title>
                <Prefix>После обработки, готовый результат можно будет скачать в формате png</Prefix>
            </HeaderBlock>
            <Content>
                <div className={style.btn_group}>
                    <motion.button onClick={close} whileTap={{scale: 0.97}} className={style.cancel}>Отменить</motion.button>
                    <motion.button onClick={events.onClickProcess} whileTap={{scale: 0.97}} className={style.apply}>Сохранить</motion.button>
                </div>
            </Content>
        </Modal>
    );
};

export default DownloadModal