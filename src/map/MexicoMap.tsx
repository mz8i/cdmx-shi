import React from 'react';
import { GeoJSON, Pane } from 'react-leaflet';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { mapLayers } from '../config/map-layers';
import { useData } from '../data/data-context';
import { useFeatureDataValue, useFeatureId } from '../data/use-feature-data';
import { useDataColor } from '../data/use-feature-data';
import { geoLevelState } from '../recoil/data-selection-state';
import { variableSpecState } from '../recoil/data-selection-state';
import {
    mapHoverState,
    singleFeatureHighlightState,
    singleFeatureSelectionState,
} from '../recoil/ui-state';
import { GeoJSONDataLayer } from './GeoJSONDataLayer';
import { LeafletMap } from './LeafletMap';
import { PaneVisibility } from './PaneVisibility';

const MemoizedGeoJSON = React.memo(GeoJSON);

export function MexicoMap() {
    const { data: cdmxData } = useData('cdmx');
    const { data: coloniasData } = useData('colonias');
    const { data: alcaldiasData } = useData('alcaldias');

    const highlightedRegions = useRecoilValue(singleFeatureHighlightState);
    const [selectedRegion, setSelectedRegion] = useRecoilState(singleFeatureSelectionState);

    const setMapHover = useSetRecoilState(mapHoverState);

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
                <PaneVisibility paneName="colonias" visible={isColonias} />
                {coloniasData && (
                    <GeoJSONDataLayer
                        data={coloniasData}
                        getId={getColoniasId}
                        getData={getData}
                        getDataColor={getDataColor}
                        layerDefinition={mapLayers.colonias}
                        type="data"
                        onFeatureHover={setMapHover}
                        highlightedFeature={highlightedRegions}
                        selectedFeature={selectedRegion}
                        onFeatureSelect={setSelectedRegion}
                    />
                )}
            </Pane>
            <Pane name="alcaldias-data">
                <PaneVisibility paneName="alcaldias-data" visible={!isColonias} />
                {alcaldiasData && (
                    <GeoJSONDataLayer
                        data={alcaldiasData}
                        getId={getAlcaldiasId}
                        getData={getData}
                        getDataColor={getDataColor}
                        layerDefinition={mapLayers.alcaldias}
                        type="data"
                        onFeatureHover={setMapHover}
                        highlightedFeature={highlightedRegions}
                        selectedFeature={selectedRegion}
                        onFeatureSelect={setSelectedRegion}
                    />
                )}
            </Pane>
            <Pane name="alcaldias-boundary" className="pointer-events-none">
                <PaneVisibility paneName="alcaldias-boundary" visible={isColonias} />
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
        </LeafletMap>
    );
}
