import { useCallback, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useSetRecoilState } from 'recoil';

import { mapPositionState } from '../recoil/debugging';

export function TrackPosition() {
    const map = useMap();
    const setMapPosition = useSetRecoilState(mapPositionState);
    const onMove = useCallback(() => {
        const center = map.getCenter();
        setMapPosition([center.lat, center.lng]);
    }, [map, setMapPosition]);
    useEffect(() => {
        map?.on('move', onMove);
    }, [map, onMove]);

    return null;
}
