import { useEffect, useMemo } from 'react';
import { useMap } from 'react-leaflet';

interface PaneVisibilityProps {
    paneName: string;
    visible: boolean;
}

export function PaneVisibility({ paneName, visible }: PaneVisibilityProps) {
    const map = useMap();

    const pane = useMemo(() => map.getPane(paneName), [map, paneName]);

    useEffect(() => {
        if (pane) {
            pane.style.visibility = visible ? 'visible' : 'hidden';
        }
    }, [pane, visible]);

    return null;
}
