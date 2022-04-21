import React, {useCallback} from 'react';
import PrimaryModal from '../components/PrimaryModal';
import { useStores } from './useStores';

export function usePrimaryModal() {
    const {playground} = useStores()

    const Modal = useCallback(() => {
        return <PrimaryModal
            show={playground.primaryModal}
            close={() => playground.togglePrimaryModal()}
        />
    }, [playground.primaryModal])

    return {Modal}
}