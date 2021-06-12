import React from 'react';
import { GeoJSON, Pane } from 'react-leaflet';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { mapLayers } from '../config/map-layers';
import { useData } from '../data/data-context';
import { useFeatureDataValue, useFeatureId } from '../data/use-feature-data';
import { useDataColor } from '../data/use-feature-data';
import { geoLevelState } from '../recoil/data-selection';
import { variableSpecState } from '../recoil/data-selection';
import { featureHighlightState, featureHoverState } from '../recoil/ui';
import { GeoJSONDataLayer } from './GeoJSONDataLayer';
import { LeafletMap } from './LeafletMap';

const MemoizedGeoJSON = React.memo(GeoJSON);

export function MexicoMap() {
    const { data: cdmxData } = useData('cdmx');
    const { data: coloniasData } = useData('colonias');
    const { data: alcaldiasData } = useData('alcaldias');

    const highlightedRegions = useRecoilValue(featureHighlightState);
    const setFeatureHover = useSetRecoilState(featureHoverState);

    const geoLevel = useRecoilValue(geoLevelState);
    const variableSpec = useRecoilValue(variableSpecState);

    const isColonias = geoLevel === 'colonias';

    const getData = useFeatureDataValue(variableSpec);
    const getDataColor = useDataColor(variableSpec);

    const getColoniasId = useFeatureId('colonias');
    const getAlcaldiasId = useFeatureId('alcaldias');

    return (
        <LeafletMap>
            <Pane name="colonias">
                {coloniasData && (
                    <GeoJSONDataLayer
                        data={coloniasData}
                        getId={getColoniasId}
                        getData={getData}
                        getDataColor={getDataColor}
                        layerDefinition={mapLayers.colonias}
                        type="data"
                        onFeatureHover={setFeatureHover}
                        highlightedFeatures={highlightedRegions}
                    />
                )}
            </Pane>
            <Pane name="alcaldias" className={isColonias ? 'pointer-events-none' : ''}>
                {alcaldiasData &&
                    (isColonias ? (
                        <MemoizedGeoJSON
                            data={alcaldiasData}
                            style={mapLayers.alcaldias.borderStyle}
                            interactive={false}
                        />
                    ) : (
                        <GeoJSONDataLayer
                            data={alcaldiasData}
                            getId={getAlcaldiasId}
                            getData={getData}
                            getDataColor={getDataColor}
                            layerDefinition={mapLayers.alcaldias}
                            type="data"
                            onFeatureHover={setFeatureHover}
                            highlightedFeatures={highlightedRegions}
                        />
                    ))}
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
        </LeafletMap>
    );
}
