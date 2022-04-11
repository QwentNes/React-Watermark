import * as React from 'react';
import Watermark from "../Watermark";
import Playground from "../Playground";
import {useMousePosition} from "../../hook/useMousePosition";

interface WorkspaceProps {

}

const Workspace: React.FC<WorkspaceProps> = ({}) => {

    const wrapRef = React.useRef(null) as React.MutableRefObject<any>
    const [scale, setScale] = React.useState(0.65)
    const position = useMousePosition(wrapRef);

    let data = {
        size:{
            width: 1880,
            height: 1250,
        },
        link: "https://images.pexels.com/photos/2537391/pexels-photo-2537391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    }

    return (
        <Playground data={data} innerRef={wrapRef} position={position} scale={{meaning: scale, setScale}}>
            <Watermark position={position} scale={scale} />
        </Playground>
    );
};

export default Workspace