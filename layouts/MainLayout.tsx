import * as React from 'react';
import style from '../styles/MainLayout.module.scss';
import InstrumentsBar from "../components/Instruments";
import {Instruments} from "../resources/Instruments";
import Parameters from "../components/Parameters";
import Workspace from "../components/Workspace";
import Resource from "../components/Resource";

interface LayoutProps {

}

const MainLayout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <InstrumentsBar data={Instruments} />
                <Workspace />
                <div className={style.side}>
                    <Resource/>
                    <Parameters/>
                </div>
            </div>
        </div>
    );
};

export default MainLayout