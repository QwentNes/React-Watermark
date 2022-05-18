import { observer } from "mobx-react-lite"
import { useStores } from "../../hook/useStores"
import DownloadModal from "../DownloadModal"
import PrimaryModal from "../PrimaryModal"
import {ModalWrap} from "./index"

const Modals: React.FC = observer(({ }) => {
    const {playground} = useStores()

    return(
        <ModalWrap show={playground.downloadModal || playground.primaryModal}>
                <PrimaryModal />
                <DownloadModal />
        </ModalWrap>
    )
})

export default Modals