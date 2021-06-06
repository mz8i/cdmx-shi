import React from "react";

import { config } from "../config";

import 'leaflet/dist/leaflet.css';
import './DataMap.css';

import { MapContainer, GeoJSON, Pane, TileLayer } from "react-leaflet";
import { useGeoJson } from "../hooks/useGeoJson";
import { mapLayers } from "../config/map-layers";
import { GeoJSONDataLayer } from "./GeoJSONDataLayer";
import { VariableSpec } from "../data-types";

interface DataMapProps {
  variableSpec: VariableSpec;
  onFeatureHover: (obj: any) => void;
  featureHover: any;
}



const MemoizedGeoJSON = React.memo(GeoJSON);

export const DataMap: React.FC<DataMapProps> = ({
  variableSpec,
  onFeatureHover,
  featureHover,
  children
}) => {
  const [coloniasData, isColoniasDataLoading] = useGeoJson('/data/colonias.geojson');
  const [alcaldiasData, isAlcaldiasDataLoading] = useGeoJson('/data/alcaldias.geojson');
  const [cdmxData, isCdmxDataLoading] = useGeoJson('/data/spatial/cdmx.geojson');

  return (
    <MapContainer
      center={[
        config.initialViewport.latitude,
        config.initialViewport.longitude,
      ]}
      zoom={10}
      zoomControl={false}
      preferCanvas={true}
    >
      <TileLayer 
        url='https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains='abcd'
	      maxZoom={19}
      />
      <Pane name="data">
        {!isColoniasDataLoading &&
          <GeoJSONDataLayer
            data={coloniasData}
            layerDefinition={mapLayers.colonias}
            onFeatureHover={onFeatureHover}
            type='data'
            variableSpec={variableSpec}
          />
        }
      </Pane>
      <Pane name="borders" style={{ pointerEvents: "none" }}>
        {!isAlcaldiasDataLoading && 
          <MemoizedGeoJSON
            data={alcaldiasData}
            style={mapLayers.alcaldias.borderStyle}
            interactive={false}
          />
        }
        {!isCdmxDataLoading && 
          <MemoizedGeoJSON
            data={cdmxData}
            style={mapLayers.cdmx.borderStyle}
            interactive={false}
          />
        }
      </Pane>
      {children}
    </MapContainer>
  );
};
