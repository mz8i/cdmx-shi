import React, { useCallback } from "react";

import { config } from "../config";

import 'leaflet/dist/leaflet.css';
import './DataMap.css';

import { MapContainer, GeoJSON, Pane, TileLayer, AttributionControl, ZoomControl } from "react-leaflet";
import { mapLayers } from "../config/map-layers";
import { GeoJSONDataLayer } from "./GeoJSONDataLayer";
import { VariableSpec } from "../data-types";
import { COLOR_SCALES } from "../config/color-scales";

interface DataMapProps {
  coloniasData;
  alcaldiasData;
  cdmxData;
  coloniasHighlights;
  variableSpec: VariableSpec;
  onFeatureHover: (obj: any) => void;
  featureHover: any;
}



const MemoizedGeoJSON = React.memo(GeoJSON);

export const DataMap: React.FC<DataMapProps> = ({
  coloniasData,
  alcaldiasData,
  cdmxData,
  coloniasHighlights,
  variableSpec,
  onFeatureHover,
  featureHover,
  children
}) => {


  const getColoniasData = useCallback((x) => x.properties[variableSpec.fullName], [variableSpec]);
  const getColoniasDataColor = useCallback((data) => COLOR_SCALES[variableSpec.variable](data), [variableSpec]);
  const getColoniasId = useCallback((x) => x.properties.ID_colonia, []);

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
      // zoomDelta={0.25}
      // wheelPxPerZoomLevel={20}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
        updateWhenZooming={true}
      />
      <Pane name="colonias">
        {coloniasData && (
          <GeoJSONDataLayer
            data={coloniasData}
            getId={getColoniasId}
            getData={getColoniasData}
            getDataColor={getColoniasDataColor}
            layerDefinition={mapLayers.colonias}
            onFeatureHover={onFeatureHover}
            type="data"
            highlightedFeatures={coloniasHighlights}
          />
        )}
      </Pane>
      <Pane name="alcaldias" className="pointer-events-none">
        {alcaldiasData && (
          <MemoizedGeoJSON
            data={alcaldiasData}
            style={mapLayers.alcaldias.borderStyle}
            interactive={false}
          />
        )}
      </Pane>
      <Pane name="cdmx" className="pointer-events-none">
        {cdmxData && (
          <MemoizedGeoJSON
            data={cdmxData}
            style={mapLayers.cdmx.borderStyle}
            interactive={false}
          />
        )}
      </Pane>
      <ZoomControl position="bottomright" />
      <AttributionControl position="bottomleft" />
      {children}
    </MapContainer>
  );
};
