import React, {useCallback} from 'react';
import PrimaryModal from '../components/PrimaryModal';
import DownloadModal from "../components/DownloadModal";
import { useStores } from './useStores';

export function useModal() {
    const {playground} = useStores()

    const Primary = useCallback(() => {
        return <PrimaryModal
            show={playground.primaryModal}
            close={() => playground.togglePrimaryModal()}
        />
    }, [playground.primaryModal])

    const Download = useCallback(() => {
        return <DownloadModal
            show={playground.downloadModal}
            close={() => playground.toggleDownloadModal()}
        />
    }, [playground.downloadModal])

    return {Primary, Download}
}