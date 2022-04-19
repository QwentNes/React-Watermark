import type {NextPage} from 'next'
import style from '../styles/Home.module.scss'
import MainLayout from "../layouts/MainLayout";
import InstrumentsBar from "../components/Instruments";
import {Instruments} from "../resources/Instruments";
import Parameters from "../components/Parameters";
import Workspace from "../components/Workspace";
import Resource from "../components/Resource";
import {observer} from "mobx-react-lite"

const Home: NextPage = observer(() => {
    return (
        <MainLayout>
            <InstrumentsBar data={Instruments} />
            <Workspace />
            <div className={style.side}>
                <Resource/>
                <Parameters/>
            </div>
        </MainLayout>
    )
})

export default Home
