import { observer } from "mobx-react-lite";
import Image from 'next/image';
import { useStores } from "../../hook/useStores";
import { usePropertiesProject } from "../../hook/usePropertiesProject";
import { Modal, HeaderBlock, Title, Prefix, Content, CloseBtn } from "../Modal/";
import style from './Property.module.scss';

const PropertyModal: React.FC = observer(({ }) => {
    const { playground } = useStores()

    return (
        <Modal show={playground.propertyModal} innerKey={`property`} size={28}>
            <HeaderBlock>
                <Title>
                    <span>Свойства проекта</span>
                    <CloseBtn click={() => playground.togglePropertyModal()} />
                </Title>
                <Prefix>Детализация текущего проекта</Prefix>
            </HeaderBlock>
            <Content>
                <SizingWarn />
                <PropsProject />
            </Content>
        </Modal>
    )
})

const SizingWarn: React.FC = () => {
    return (
        <div className={style.info}>
            <div className={style.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <path d="M19.5099 5.85L13.5699 2.42C12.5999 1.86 11.3999 1.86 10.4199 2.42L4.48992 5.85C3.51992 6.41 2.91992 7.45 2.91992 8.58V15.42C2.91992 16.54 3.51992 17.58 4.48992 18.15L10.4299 21.58C11.3999 22.14 12.5999 22.14 13.5799 21.58L19.5199 18.15C20.4899 17.59 21.0899 16.55 21.0899 15.42V8.58C21.0799 7.45 20.4799 6.42 19.5099 5.85ZM11.2499 7.75C11.2499 7.34 11.5899 7 11.9999 7C12.4099 7 12.7499 7.34 12.7499 7.75V13C12.7499 13.41 12.4099 13.75 11.9999 13.75C11.5899 13.75 11.2499 13.41 11.2499 13V7.75ZM12.9199 16.63C12.8699 16.75 12.7999 16.86 12.7099 16.96C12.5199 17.15 12.2699 17.25 11.9999 17.25C11.8699 17.25 11.7399 17.22 11.6199 17.17C11.4899 17.12 11.3899 17.05 11.2899 16.96C11.1999 16.86 11.1299 16.75 11.0699 16.63C11.0199 16.51 10.9999 16.38 10.9999 16.25C10.9999 15.99 11.0999 15.73 11.2899 15.54C11.3899 15.45 11.4899 15.38 11.6199 15.33C11.9899 15.17 12.4299 15.26 12.7099 15.54C12.7999 15.64 12.8699 15.74 12.9199 15.87C12.9699 15.99 12.9999 16.12 12.9999 16.25C12.9999 16.38 12.9699 16.51 12.9199 16.63Z" />
                </svg>
            </div>
            <div className={style.text}>
                <span>Расчетный вес может отличаться</span>
            </div>
        </div>
    )
}

const PropsProject: React.FC = observer(() => {
    const { projectProps, watermarksList } = usePropertiesProject()

    const loader = ({ src }: any) => {
        return "https://api.watermarker.space/uploads/" + src;
    }

    return (
        <>
            <div className={style.props_block}>
                <ul className={style.props}>
                    {
                        projectProps.map((item, index) => {
                            return <li key={`prop_${index}`}>{item.name}</li>
                        })
                    }
                </ul>
                <ul className={style.values}>
                    {
                        projectProps.map((item, index) => {
                            return <li key={`value_${index}`}>{item.action}</li>
                        })
                    }
                </ul>
            </div>
            {
                watermarksList.length > 0 && <div className={style.props_header}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19.3697 4.89109L13.5097 2.28109C12.6497 1.90109 11.3497 1.90109 10.4897 2.28109L4.62969 4.89109C3.14969 5.55109 2.92969 6.45109 2.92969 6.93109C2.92969 7.41109 3.14969 8.31109 4.62969 8.97109L10.4897 11.5811C10.9197 11.7711 11.4597 11.8711 11.9997 11.8711C12.5397 11.8711 13.0797 11.7711 13.5097 11.5811L19.3697 8.97109C20.8497 8.31109 21.0697 7.41109 21.0697 6.93109C21.0697 6.45109 20.8597 5.55109 19.3697 4.89109Z" />
                        <path d="M12.0003 17.04C11.6203 17.04 11.2403 16.96 10.8903 16.81L4.15031 13.81C3.12031 13.35 2.32031 12.12 2.32031 10.99C2.32031 10.58 2.65031 10.25 3.06031 10.25C3.47031 10.25 3.80031 10.58 3.80031 10.99C3.80031 11.53 4.25031 12.23 4.75031 12.45L11.4903 15.45C11.8103 15.59 12.1803 15.59 12.5003 15.45L19.2403 12.45C19.7403 12.23 20.1903 11.54 20.1903 10.99C20.1903 10.58 20.5203 10.25 20.9303 10.25C21.3403 10.25 21.6703 10.58 21.6703 10.99C21.6703 12.11 20.8703 13.35 19.8403 13.81L13.1003 16.81C12.7603 16.96 12.3803 17.04 12.0003 17.04Z" />
                        <path d="M12.0003 22.0009C11.6203 22.0009 11.2403 21.9209 10.8903 21.7709L4.15031 18.7709C3.04031 18.2809 2.32031 17.1709 2.32031 15.9509C2.32031 15.5409 2.65031 15.2109 3.06031 15.2109C3.47031 15.2109 3.80031 15.5409 3.80031 15.9509C3.80031 16.5809 4.17031 17.1509 4.75031 17.4109L11.4903 20.4109C11.8103 20.5509 12.1803 20.5509 12.5003 20.4109L19.2403 17.4109C19.8103 17.1609 20.1903 16.5809 20.1903 15.9509C20.1903 15.5409 20.5203 15.2109 20.9303 15.2109C21.3403 15.2109 21.6703 15.5409 21.6703 15.9509C21.6703 17.1709 20.9503 18.2709 19.8403 18.7709L13.1003 21.7709C12.7603 21.9209 12.3803 22.0009 12.0003 22.0009Z" />
                    </svg>
                    <span>Использованные водяные знаки</span>
                </div>
            }
            <div className={style.layers_block}>
                {
                    watermarksList.map((item, index) => {
                        return (
                            <div className={style.layer} key={'layer_prop_' + index}>
                                <div className={style.image}>
                                    <Image loader={loader} src={item.initial.link} width={90} height={60} objectFit={`cover`} />
                                </div>
                                <div className={style.desk}>
                                    <div className={style.watermark_name}>
                                        <span>Водяной знак {index + 1}</span>
                                    </div>
                                    <div className={style.watermark_link}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M16.5002 18.25H14.9902C14.5802 18.25 14.2402 17.91 14.2402 17.5C14.2402 17.09 14.5802 16.75 14.9902 16.75H16.5002C19.1202 16.75 21.2502 14.62 21.2502 12C21.2502 9.38 19.1202 7.25 16.5002 7.25H15.0002C14.5902 7.25 14.2502 6.91 14.2502 6.5C14.2502 6.09 14.5802 5.75 15.0002 5.75H16.5002C19.9502 5.75 22.7502 8.55 22.7502 12C22.7502 15.45 19.9502 18.25 16.5002 18.25Z" />
                                            <path d="M9 18.25H7.5C4.05 18.25 1.25 15.45 1.25 12C1.25 8.55 4.05 5.75 7.5 5.75H9C9.41 5.75 9.75 6.09 9.75 6.5C9.75 6.91 9.41 7.25 9 7.25H7.5C4.88 7.25 2.75 9.38 2.75 12C2.75 14.62 4.88 16.75 7.5 16.75H9C9.41 16.75 9.75 17.09 9.75 17.5C9.75 17.91 9.41 18.25 9 18.25Z" />
                                            <path d="M16 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" />
                                        </svg>
                                        <a target={`_blank`} href={'https://api.watermarker.space/uploads/'+item.initial.link}>.../uploads/{item.initial.link}</a>
                                    </div>
                                    <div className={style.watermark_option}>
                                        <span>размер: {item.current.size.width}x{Math.round(item.current.size.height)}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
})

export default PropertyModal