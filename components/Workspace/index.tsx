import * as React from 'react';
import Watermark from "../Watermark";
import Playground from "../Playground";
import Editor from "../Editor";
import {useStores} from "../../hook/useStores";
import {observer} from "mobx-react-lite";
import { useWorkspace } from '../../hook/useWorkspace';

interface WorkspaceProps {

}

const Workspace: React.FC<WorkspaceProps> = observer(({}) => {
    const {watermarks, playground} = useStores()
    const {workSpaceRef, mousePosition, WatermarkElements} = useWorkspace(watermarks.list, playground.config.edit)

    return (
        <Playground workSpaceRef={workSpaceRef} position={mousePosition}>
            {
                watermarks.list.map((item, index) => {
                    return <Watermark id={item.id} key={`watermark_` + index}/>
                })
            }
            {
                playground.config.edit != -1 && <Editor position={mousePosition}/>
            }
        </Playground>
    );
});

export default Workspace