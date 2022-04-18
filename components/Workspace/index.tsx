import * as React from 'react';
import Editor from "../Editor";
import Playground from "../Playground";
import {observer} from "mobx-react-lite";
import {useStores} from "../../hook/useStores";
import {useWorkspace} from '../../hook/useWorkspace';

interface WorkspaceProps {

}

const Workspace: React.FC<WorkspaceProps> = observer(({}) => {
    const {watermarks, playground} = useStores()
    const {workSpaceRef, mousePosition, WatermarkElements} = useWorkspace(watermarks.list, playground.config.edit)

    return (
        <Playground workSpaceRef={workSpaceRef} position={mousePosition}>
            <WatermarkElements />
            <Editor position={mousePosition}/>
        </Playground>
    );
});

export default Workspace