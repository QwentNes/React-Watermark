import * as React from 'react';
import {Slider, Select, Size} from "../Inputs";
import {useStores} from "../../hook/useStores";
import {observer} from "mobx-react-lite";
import style from './Parameters.module.scss';
import classNames from "classnames/bind";
import {motion} from 'framer-motion';


interface ParametersProps {

}

const Parameters: React.FC<ParametersProps> = observer(({}) => {
    const {watermarks, playground} = useStores()
    const elementId = playground.config.edit
    const element = watermarks.find(elementId)

    return (
        <>
                <div className={style.parameters}>
                    <div className={style.header}>
                        <div className={style.title}>
                            <span>Параметры</span>
                        </div>
                    </div>
                    {element &&
                    <div className={style.effect_list}>
                        <li className={style.effect}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path d="M15 22.75H14C13.59 22.75 13.25 22.41 13.25 22C13.25 21.59 13.59 21.25 14 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9C4.39 2.75 2.75 4.39 2.75 9V9.98C2.75 10.39 2.41 10.73 2 10.73C1.59 10.73 1.25 10.39 1.25 9.98V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75Z"/>
                                <path d="M12.9995 11.7488C12.8095 11.7488 12.6195 11.6787 12.4695 11.5287C12.1795 11.2387 12.1795 10.7588 12.4695 10.4688L16.2095 6.71875H13.9995C13.5895 6.71875 13.2495 6.37875 13.2495 5.96875C13.2495 5.55875 13.5795 5.21875 13.9995 5.21875H18.0095C18.3095 5.21875 18.5895 5.39875 18.6995 5.67875C18.8195 5.95875 18.7495 6.27875 18.5395 6.49875L13.5295 11.5287C13.3795 11.6787 13.1895 11.7488 12.9995 11.7488Z"/>
                                <path d="M18.0098 10.7387C17.5998 10.7387 17.2598 10.3987 17.2598 9.98875V5.96875C17.2598 5.55875 17.5998 5.21875 18.0098 5.21875C18.4198 5.21875 18.7598 5.55875 18.7598 5.96875V9.97875C18.7598 10.3987 18.4198 10.7387 18.0098 10.7387Z"/>
                                <path d="M7.85 22.75H5.15C2.49 22.75 1.25 21.51 1.25 18.85V16.15C1.25 13.49 2.49 12.25 5.15 12.25H7.85C10.51 12.25 11.75 13.49 11.75 16.15V18.85C11.75 21.51 10.51 22.75 7.85 22.75ZM5.15 13.75C3.31 13.75 2.75 14.31 2.75 16.15V18.85C2.75 20.69 3.31 21.25 5.15 21.25H7.85C9.69 21.25 10.25 20.69 10.25 18.85V16.15C10.25 14.31 9.69 13.75 7.85 13.75H5.15V13.75Z"/>
                            </svg>
                            <span>Эффект</span>
                            <Select
                                mode={element.current.mode}
                                setState={(value: string) => {
                                    watermarks.setParam(elementId, "mode", value)
                                }}/>
                        </li>
                        <li className={classNames(style.effect, style.bottom_effect)}>
                            <div className={style.title}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path d="M11.9986 22.75C7.11857 22.75 3.14856 18.78 3.14856 13.9C3.11856 8.17 8.57856 3.4 10.9286 1.61C11.5586 1.13 12.4386 1.13 13.0686 1.61C15.4186 3.43 20.8786 8.26 20.8486 13.91C20.8486 18.78 16.8786 22.75 11.9986 22.75ZM11.9986 2.75C11.9486 2.75 11.8886 2.77 11.8386 2.81C10.1486 4.1 4.62857 8.71 4.65857 13.9C4.65857 17.96 7.95858 21.25 12.0086 21.25C16.0586 21.25 19.3586 17.96 19.3586 13.91C19.3886 8.79 13.8586 4.12 12.1586 2.81C12.0986 2.77 12.0486 2.75 11.9986 2.75Z"/>
                                </svg>
                                <span>Прозрачность метки</span>
                            </div>
                            <Slider
                                value={element.current.opacity}
                                setState={(value: number) => {
                                    watermarks.setParam(elementId, "opacity", value)
                                }}
                            />
                        </li>
                        <li className={style.effect}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path d="M11.7207 22.75H7.2207C3.0707 22.75 1.2207 20.9 1.2207 16.75V12.25C1.2207 8.1 3.0707 6.25 7.2207 6.25H11.7207C15.8707 6.25 17.7207 8.1 17.7207 12.25V16.75C17.7207 20.9 15.8707 22.75 11.7207 22.75ZM7.2207 7.75C3.9007 7.75 2.7207 8.93 2.7207 12.25V16.75C2.7207 20.07 3.9007 21.25 7.2207 21.25H11.7207C15.0407 21.25 16.2207 20.07 16.2207 16.75V12.25C16.2207 8.93 15.0407 7.75 11.7207 7.75H7.2207Z"/>
                                <path d="M18.1207 13.75H16.9707C16.5607 13.75 16.2207 13.41 16.2207 13V12.25C16.2207 8.93 15.0407 7.75 11.7207 7.75H10.9707C10.5607 7.75 10.2207 7.41 10.2207 7V5.85C10.2207 2.67 11.6407 1.25 14.8207 1.25H18.1207C21.3007 1.25 22.7207 2.67 22.7207 5.85V9.15C22.7207 12.33 21.3007 13.75 18.1207 13.75ZM17.7207 12.25H18.1207C20.4707 12.25 21.2207 11.5 21.2207 9.15V5.85C21.2207 3.5 20.4707 2.75 18.1207 2.75H14.8207C12.4707 2.75 11.7207 3.5 11.7207 5.85V6.25C15.8707 6.25 17.7207 8.1 17.7207 12.25Z"/>
                            </svg>
                            <span>Размер</span>
                            <Size
                                value={element.current.size}
                                setState={(width: number, height: number) => {
                                    watermarks.setParam(elementId, "size_width", width)
                                    watermarks.setParam(elementId, "size_height", height)
                                }}
                            />
                        </li>
                        <li className={style.effect}>
                            <motion.button
                                whileTap={{
                                    scale: 0.95
                                }}
                                onClick={() => watermarks.delete(elementId)}
                                className={style.delete_btn}
                            >
                                Удалить метку
                            </motion.button>
                        </li>
                    </div>
                    }
                    {!element &&
                    <div className={style.no_element}>
                        <span>Для выбора параметров выберите изображение на рабочей области</span>
                    </div>}
                </div>
        </>
    );
});

export default Parameters