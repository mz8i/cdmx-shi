import React from "react";

import { config } from "../config";

import './LeafletMap.css';

import { MapContainer, TileLayer, AttributionControl, ZoomControl } from "react-leaflet";


export const LeafletMap: React.FC<{}> = ({
  children
}) => {
  return (
    <MapContainer
      center={[
        config.initialViewport.latitude,
        config.initialViewport.longitude,
      ]}
      zoom={config.initialViewport.zoom}
      preferCanvas={false}
      zoomControl={false}
      attributionControl={false}
      zoomSnap={0.25}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
        updateWhenZooming={true}
      />
      <ZoomControl position="bottomright" />
      <AttributionControl position="bottomleft" />
      {children}
    </MapContainer>
  );
};