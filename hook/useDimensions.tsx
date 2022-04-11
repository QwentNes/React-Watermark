import * as React from 'react';

type Dimensions = {
    width: number;
    height: number;
    prevWidth: number;
    prevHeight: number;
};

export function useDimensions(ref: React.RefObject<HTMLElement>, deps: any[] = []) {
    const [dimensions, setDimensions] = React.useState<Dimensions>({
        width: ref.current?.clientWidth ?? 0,
        height: ref.current?.clientHeight ?? 0,
        prevWidth: 0,
        prevHeight: 0
    });
    const onWidthOrHeightChange = React.useCallback(() => {
        setDimensions((prev) => ({
            // @ts-ignore
                width: ref.current.clientWidth,
            // @ts-ignore
                height: ref.current.clientHeight,
                prevWidth: prev.width,
                prevHeight: prev.height
            }));
    }, [ref]);
    React.useEffect(() => {
        onWidthOrHeightChange();
    }, [onWidthOrHeightChange, ...deps]);
    return dimensions;
}