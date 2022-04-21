import * as React from 'react';
import style from '../styles/MainLayout.module.scss';
import { Toaster } from 'react-hot-toast';
import StartModal from '../components/PrimaryModal'

interface LayoutProps {

}
const MainLayout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                {children}
                <Toaster
                position={"bottom-left"}
                reverseOrder={false}
                toastOptions={{
                    duration: 5000,
                    style: {
                        fontFamily: 'inter, sans-serif',
                        background: '#22222A',
                        color: '#E7E7E8',
                        boxShadow: '0 0 0.35em rgba(0, 0, 0, .25)',
                        padding: '1em 1.25em',
                        fontSize: '0.875em'
                    },
                }}
                />
            </div>
        </div>
    );
};

export default MainLayout