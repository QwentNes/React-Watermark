import type {NextPage} from 'next'
import style from '../styles/Home.module.scss'
import MainLayout from "../layouts/MainLayout";
import InstrumentsBar from "../components/Instruments";
import {Instruments} from "../resources/Instruments";
import Parameters from "../components/Parameters";
import Workspace from "../components/Workspace";
import Resource from "../components/Resource";
import {observer} from "mobx-react-lite";
import Modals from '../components/Modal/Modals';
import Head from 'next/head'

const Home: NextPage = observer(() => {
    return (
        <MainLayout>
            <Head>
                <title>Watermarker</title>
            </Head>
            <InstrumentsBar data={Instruments} />
            <Workspace />
                <div className={style.side}>
                    <Resource/>
                    <Parameters/>
                </div>
            <Modals />
        </MainLayout>
    )
})

export default Home
