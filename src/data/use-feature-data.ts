import { useCallback, useMemo } from 'react';

import { COLOR_SCALES } from '../config/color-scales';
import { DATA_SOURCES } from '../config/data-sources';
import {
    DimensionSpec,
    GeoLevel,
    VARIABLES,
    VariableName,
    VariableSpec,
} from '../config/variables';
import { objectMap } from '../util';
import { DataFeature } from './data-context';

export function getVariableFullKey({ dataset, variable, dimensions }: VariableSpec) {
    const varDef = VARIABLES[dataset][variable];
    if (varDef == null) {
        return undefined;
    }

    if (varDef.dimensions && dimensions) {
        return `${variable}_${dimensions.time}_${dimensions.weighting}_${dimensions.budget}` as const;
    } else {
        return `${variable}` as const;
    }
}

export function useFeatureDataValue(variableSpec: VariableSpec) {
    const fullKey = getVariableFullKey(variableSpec);
    return useCallback(x => fullKey && x.properties[fullKey], [fullKey]);
}

export function useGetManyVariables(
    variables: VariableName[],
    dimensions: DimensionSpec,
    dataset: GeoLevel,
) {
    const variableKeys = useMemo(
        () =>
            Object.fromEntries(
                variables.map(variable => [
                    variable,
                    getVariableFullKey({ dataset, variable, dimensions }),
                ]),
            ),
        [variables, dimensions, dataset],
    );

    return useCallback(
        (feature: DataFeature) => {
            return objectMap(variableKeys, vk => feature.properties[vk]);
        },
        [variableKeys],
    );

    // return useMemo(() => {

    //     return objectMap(variableKeys, (variableKey) => {
    //         (feature) =>
    //     });

    // }, [variables, dimensions, dataset]);

    // return objectMap();
}

export function useDataColor(variableSpec: VariableSpec) {
    return useCallback((d: any) => COLOR_SCALES[variableSpec.variable](d), [variableSpec]);
}

export function useFeatureDataColor(variableSpec: VariableSpec) {
    const fullKey = getVariableFullKey(variableSpec);

    return useCallback(
        f => fullKey && COLOR_SCALES[variableSpec.variable](f.properties[fullKey]),
        [variableSpec, fullKey],
    );
}

export function useFeatureId(geoLevel: GeoLevel) {
    const idField = useMemo(() => DATA_SOURCES[geoLevel].idField, [geoLevel]);

    return useCallback(x => x?.properties?.[idField], [idField]);
}

export function useFeatureName(geoLevel: GeoLevel) {
    const nameField = useMemo(() => DATA_SOURCES[geoLevel].nameField, [geoLevel]);

    return useCallback(x => nameField && x?.properties?.[nameField], [nameField]);
}

export function useFeatureParentName(geoLevel: GeoLevel) {
    const parentNameField = useMemo(() => DATA_SOURCES[geoLevel].parentNameField, [geoLevel]);

    return useCallback(x => parentNameField && x?.properties?.[parentNameField], [parentNameField]);
}

export function useGetMetadata(geoLevel: GeoLevel) {
    const getId = useFeatureId(geoLevel);
    const getName = useFeatureName(geoLevel);
    const getParentName = useFeatureParentName(geoLevel);

    return useMemo(
        () => ({
            getId,
            getName,
            getParentName,
        }),
        [getId, getName, getParentName],
    );
}
