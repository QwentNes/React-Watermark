import style from '../styles/MainLayout.module.scss';
import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';

interface LayoutProps {

}

const MainLayout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className={style.wrapper}> 
            <div className={style.container}>
                <Header />
                <div className={style.main_board}>
                    {children}
                    <Toaster
                    position={"bottom-left"}
                    reverseOrder={false}
                    toastOptions={{
                        duration: 5000,
                        style: {
                            fontFamily: 'inter, sans-serif',
                            background: 'var(--blocks-background-var)',
                            color: 'var(--white-color-var)',
                            boxShadow: '0 0 0.35em rgba(0, 0, 0, .25)',
                            padding: '1em 1.25em',
                            fontSize: '0.875em'
                        },
                    }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MainLayout