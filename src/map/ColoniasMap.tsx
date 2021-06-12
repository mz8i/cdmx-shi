import React, { useCallback } from 'react';
import { Pane, GeoJSON } from 'react-leaflet';
import { COLOR_SCALES } from '../config/color-scales';
import { mapLayers } from '../config/map-layers';
import { GeoJSONDataLayer } from './GeoJSONDataLayer';

const MemoizedGeoJSON = React.memo(GeoJSON);

export function ColoniasMap({
    coloniasData,
    alcaldiasData,
    cdmxData,
    coloniasHighlights,
    variableSpec,
    onFeatureHover,
    featureHover,
}) {
    const getColoniasData = useCallback(x => x.properties[variableSpec.fullName], [variableSpec]);
    const getColoniasDataColor = useCallback(
        data => COLOR_SCALES[variableSpec.variable](data),
        [variableSpec]
    );
    const getColoniasId = useCallback(x => x.properties.ID_colonia, []);

    return (
        <>
            <Pane name="colonias">
                {coloniasData && (
                    <GeoJSONDataLayer
                        data={coloniasData}
                        getId={getColoniasId}
                        getData={getColoniasData}
                        getDataColor={getColoniasDataColor}
                        layerDefinition={mapLayers.colonias}
                        type="data"
                        onFeatureHover={onFeatureHover}
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
