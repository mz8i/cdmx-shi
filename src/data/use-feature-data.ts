import { useCallback, useMemo } from 'react';

import { COLOR_SCALES } from '../config/color-scales';
import { DATA_SOURCES } from '../config/data-sources';
import { GeoLevel, VARIABLES, VariableSpec } from '../config/variables';

export function getVariableFullKey({ dataset, variable, dimensions }: VariableSpec) {
    const varDef = VARIABLES[dataset][variable];
    if (varDef == null) {
        return null;
    }

    if (varDef.dimensions) {
        return `${variable}_${dimensions.time}_${dimensions.weighting}_${dimensions.budget}` as const;
    } else {
        return `${variable}` as const;
    }
}

export function useFeatureDataValue(variableSpec: VariableSpec) {
    const fullKey = getVariableFullKey(variableSpec);
    return useCallback(x => fullKey && x.properties[fullKey], [fullKey]);
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
