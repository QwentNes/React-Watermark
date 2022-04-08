import * as React from 'react';
import {Modal, HeaderBlock, Title, Prefix, Warning, Content} from "../Modal/";
import style from './StartModal.module.scss'

interface ModalProps {

}

const StartModal: React.FC<ModalProps> = ({}) => {
    return (
        <Modal show={true}>
            <HeaderBlock>
                <Title>
                    Создание проекта
                </Title>
                <Prefix>
                    Для начала создания необходимо указать название проекта и загрузить медиафайл
                </Prefix>
            </HeaderBlock>
            <Content>
                <div className={style.input_group}>
                    <input type={`text`} placeholder={`Название проекта`}/>
                    <input type={`submit`} value={`Продолжить`}/>
                </div>
                <div className={style.drop_file}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M11 17.7514C10.81 17.7514 10.62 17.6814 10.47 17.5314C10.18 17.2414 10.18 16.7614 10.47 16.4714L11.19 15.7514H7C6.59 15.7514 6.25 15.4114 6.25 15.0014C6.25 14.5914 6.59 14.2514 7 14.2514H11.19L10.47 13.5314C10.32 13.3814 10.25 13.1914 10.25 13.0014C10.25 12.8114 10.32 12.6214 10.47 12.4714C10.76 12.1814 11.24 12.1814 11.53 12.4714L13.53 14.4714C13.66 14.6014 13.73 14.7714 13.74 14.9314C13.74 14.9814 13.74 15.0414 13.74 15.0914C13.72 15.2314 13.66 15.3614 13.56 15.4814C13.55 15.4914 13.53 15.5114 13.52 15.5214L11.52 17.5214C11.38 17.6814 11.19 17.7514 11 17.7514Z"/>
                        <path
                            d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H14C14.41 1.25 14.75 1.59 14.75 2C14.75 2.41 14.41 2.75 14 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z"/>
                        <path
                            d="M22 10.7485H18C14.58 10.7485 13.25 9.41852 13.25 5.99852V1.99852C13.25 1.69852 13.43 1.41852 13.71 1.30852C13.99 1.18852 14.31 1.25852 14.53 1.46852L22.53 9.46852C22.74 9.67852 22.81 10.0085 22.69 10.2885C22.57 10.5685 22.3 10.7485 22 10.7485ZM14.75 3.80852V5.99852C14.75 8.57852 15.42 9.24852 18 9.24852H20.19L14.75 3.80852Z"/>
                    </svg>
                    <span>Перетащите медиафайл или <a>выберите файл</a></span>
                </div>
                <Warning />
            </Content>
        </Modal>
    );
};

export default StartModal