import React from 'react';

type HTMLListener<K extends keyof HTMLElementEventMap> = (
    event: HTMLElementEventMap[K]
) => any;

type Position = {
    x: number;
    y: number;
};

export function useMousePosition(ref: React.RefObject<HTMLElement>) {
    const [position, setPosition] = React.useState<Position>({x: 0, y: 0});
    const onMouseLeave = React.useCallback<HTMLListener<"mouseleave">>(() => {
        setPosition({ 
            x: 0,
            y: 0
        });
    }, [setPosition]);

    const onMouseEvent = React.useCallback<HTMLListener<"mousemove" | "wheel">>(
        (event) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setPosition({
                    x: (ref.current.scrollLeft ?? 0) + event.x - rect.left,
                    y: (ref.current.scrollTop ?? 0) + event.y - rect.top
                });
            }
        },
        [setPosition, ref]
    );
    React.useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener("mouseleave", onMouseLeave);
            ref.current.addEventListener("mousemove", onMouseEvent);
            ref.current.addEventListener("wheel", onMouseEvent);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener("mouseleave", onMouseLeave);
                ref.current.removeEventListener("mousemove", onMouseEvent);
                ref.current.removeEventListener("wheel", onMouseEvent);
            }
        };
    }, [ref, onMouseLeave, onMouseEvent]);
    return position;
}
