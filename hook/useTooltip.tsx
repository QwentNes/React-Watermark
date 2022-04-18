import React from 'react';
import {autoUpdate, useFloating} from '@floating-ui/react-dom';

export function useTooltip() {
    const [show, setShow] = React.useState<boolean>(false);

    const {x, y, reference, floating, update, refs} = useFloating({
        placement: 'right',
    })

    const animate = {
        visible: {
            display: 'flex',
            opacity: 1,
            x: 0,
            transition: {
                opacity: {
                    stiffness: 200,
                },
            }
        },
        hidden: {
            x: 10,
            opacity: 0,
            transitionEnd: {
                display: 'none',
            }
        }
    }

    React.useEffect(() => {
        if (!refs.reference.current || !refs.floating.current) {
            return;
        }

        return autoUpdate(
            refs.reference.current,
            refs.floating.current,
            update
        );
    }, [refs.reference, refs.floating, update]);

    const toggle = {
        MouseOver: () => setShow(true),
        MouseOut: () => setShow(false)
    }

    const position:React.CSSProperties = {
        top: y ?? 0,
        left: x ?? 0,
    }

    return {reference, toggle, animate, show, floating, position}
}