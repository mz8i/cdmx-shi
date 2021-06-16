import './LeafletMap.css';

import React from 'react';
import {
    AttributionControl,
    MapConsumer,
    MapContainer,
    TileLayer,
    ZoomControl,
} from 'react-leaflet';
import { useSetRecoilState } from 'recoil';

import { config } from '../config';
import { mapPositionState } from '../recoil/debugging';

export const LeafletMap: React.FC<{}> = ({ children }) => {
    const setMapPosition = useSetRecoilState(mapPositionState);

    return (
        <MapContainer
            center={[config.initialViewport.latitude, config.initialViewport.longitude]}
            zoom={config.initialViewport.zoom}
            preferCanvas={false}
            zoomControl={false}
            attributionControl={false}
            zoomSnap={0.25}
        >
            <MapConsumer>
                {map => {
                    const pos = map.getBounds().getCenter();
                    setMapPosition([pos.lat, pos.lng]);

                    return null;
                }}
            </MapConsumer>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                subdomains="abcd"
                maxZoom={19}
                updateWhenZooming={true}
            />
            <AttributionControl position="bottomright" />
            <ZoomControl position="bottomright" />
            {children}
        </MapContainer>
    );
};
