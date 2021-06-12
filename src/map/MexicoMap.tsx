import React from 'react';
import { Pane, GeoJSON } from 'react-leaflet';
import { mapLayers } from '../config/map-layers';
import { useData } from '../data/data-context';
import { GeoLevel, VariableSpec } from '../config/variables';
import { GeoJSONDataLayer } from './GeoJSONDataLayer';
import { LeafletMap } from './LeafletMap';
import { useFeatureDataValue } from '../data/use-feature-data';
import { useDataColor } from '../data/use-feature-data';

const MemoizedGeoJSON = React.memo(GeoJSON);

interface MexicoMapProps {
    geoLevel: GeoLevel;
    variableSpec: VariableSpec;
    highlightedRegions: any[];
    onFeatureHover: any;
    featureHover: any;
}

function getColoniasId(x) {
    return x.properties.ID_colonia;
}

function getAlcaldiasId(x) {
    return x.properties.Municipality;
}

export function MexicoMap({
    geoLevel,
    variableSpec,
    highlightedRegions,
    onFeatureHover,
}: MexicoMapProps) {
    const { data: cdmxData } = useData('cdmx');
    const { data: coloniasData } = useData('colonias');
    const { data: alcaldiasData } = useData('alcaldias');

    const isColonias = geoLevel === 'colonias';

    const getData = useFeatureDataValue(variableSpec);
    const getDataColor = useDataColor(variableSpec);

    return (
        <LeafletMap>
            <Pane name="colonias">
                {isColonias && coloniasData && (
                    <GeoJSONDataLayer
                        data={coloniasData}
                        getId={getColoniasId}
                        getData={getData}
                        getDataColor={getDataColor}
                        layerDefinition={mapLayers.colonias}
                        type="data"
                        onFeatureHover={onFeatureHover}
                        highlightedFeatures={highlightedRegions}
                    />
                )}
            </Pane>
            <Pane name="alcaldias" className={isColonias ? 'pointer-events-none' : ''}>
                {isColonias && alcaldiasData && (
                    <MemoizedGeoJSON
                        data={alcaldiasData}
                        style={mapLayers.alcaldias.borderStyle}
                        interactive={false}
                    />
                )}
                {!isColonias && alcaldiasData && (
                    <GeoJSONDataLayer
                        data={alcaldiasData}
                        getId={getAlcaldiasId}
                        getData={getData}
                        getDataColor={getDataColor}
                        layerDefinition={mapLayers.alcaldias}
                        type="data"
                        onFeatureHover={onFeatureHover}
                        highlightedFeatures={highlightedRegions}
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
