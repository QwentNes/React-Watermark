import * as React from 'react';
import Watermark from "../Watermark";
import Playground from "../Playground";
import {useMousePosition} from "../../hook/useMousePosition";
import Editor from "../Editor";
import {useStores} from "../../hook/useStores";
import {observer} from "mobx-react-lite";

interface WorkspaceProps {

}

const Workspace: React.FC<WorkspaceProps> = observer(({}) => {

    const wrapRef = React.useRef(null) as React.MutableRefObject<any>
    const position = useMousePosition(wrapRef);
    const {watermarks, playground} = useStores();

    return (
        <Playground innerRef={wrapRef} position={position}>
            {
                watermarks.list.map((item, index) => {
                    return <Watermark id={item.id} key={`watermark_` + index}/>
                })
            }
            {
                playground.config.edit != -1 && <Editor position={position}/>
            }
        </Playground>
    );
});

export default Workspace