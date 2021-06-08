import React, { useCallback } from "react";
import { Pane, GeoJSON } from "react-leaflet";
import { COLOR_SCALES } from "../config/color-scales";
import { mapLayers } from "../config/map-layers";
import { GeoJSONDataLayer } from "./GeoJSONDataLayer";

const MemoizedGeoJSON = React.memo(GeoJSON);

export function AlcaldiasMap({
  alcaldiasData,
  cdmxData,
  alcaldiasHighlights,
  variableSpec,
  onFeatureHover,
  featureHover,
}) {
  const getAlcaldiasData = useCallback(
    (x) => x.properties[variableSpec.fullName],
    [variableSpec]
  );
  const getAlcaldiasDataColor = useCallback(
    (data) => COLOR_SCALES[variableSpec.variable](data),
    [variableSpec]
  );
  const getAlcaldiasId = useCallback((x) => x.properties.Municipality, []);

  return (
    <>
      <Pane name="alcaldias">
        {alcaldiasData && (
          <GeoJSONDataLayer
            data={alcaldiasData}
            getId={getAlcaldiasId}
            getData={getAlcaldiasData}
            getDataColor={getAlcaldiasDataColor}
            layerDefinition={mapLayers.alcaldias}
            type="data"
            onFeatureHover={onFeatureHover}
            highlightedFeatures={alcaldiasHighlights}
          />
        )}
      </Pane>
      {/* <Pane name="alcaldias" className="pointer-events-none">
        {alcaldiasData && (
          <MemoizedGeoJSON
            data={alcaldiasData}
            style={mapLayers.alcaldias.borderStyle}
            interactive={false}
          />
        )}
      </Pane> */}
      <Pane name="cdmx" className="pointer-events-none">
        {cdmxData && (
          <MemoizedGeoJSON
            data={cdmxData}
            style={mapLayers.cdmx.borderStyle}
            interactive={false}
          />
        )}
      </Pane>
      {/* <Pane name="highlight" style={{ zIndex: 500 }}>
        {coloniasData && (
          <GeoJSONHighlightLayer
            data={coloniasData}
            getId={getColoniasId}
            layerDefinition={mapLayers.colonias_hover}
            onFeatureHover={onFeatureHover}
            highlightedFeatures={coloniasHighlights}
          />
        )}
      </Pane> */}
    </>
  );
}