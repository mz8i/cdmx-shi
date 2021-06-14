import { scaleThreshold } from 'd3-scale';
import { useCallback, useMemo } from 'react';

import { DATA_SOURCES } from '../config/data-sources';
import { COLOR_SCALES, SCALE_MAPPINGS } from '../config/scales';
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
}

export function useColorScale(variableSpec: VariableSpec) {
    const { colorScale: csDef = null, scaleMapping: smDef = null } =
        VARIABLES[variableSpec.dataset][variableSpec.variable];

    const colorScale = COLOR_SCALES[csDef];
    const scaleMapping = SCALE_MAPPINGS[smDef];

    return useMemo(() => {
        const scaleDomain = scaleMapping.map(x => x.from);
        scaleDomain.push(scaleMapping[scaleMapping.length - 1].to);

        const scaleRange = ['#ccc', ...colorScale, '#000'];

        if (scaleMapping[0].exclusiveFrom) {
            // if the first threshold should not be included, we need to add a tiny number
            scaleDomain[0] = scaleDomain[0] + 0.001;
        }

        const d3Scale = scaleThreshold<number, string>().domain(scaleDomain).range(scaleRange);

        return (val: number) => {
            if (val == null) {
                return 'rgba(0,0,0,0)';
            } else return d3Scale(val);
        };
    }, [scaleMapping, colorScale]);
}

export function useTextScale(variableSpec: VariableSpec) {
    const { scaleMapping: smDef = null } = VARIABLES[variableSpec.dataset][variableSpec.variable];

    const scaleMapping = SCALE_MAPPINGS[smDef];

    return useMemo(() => {
        const scaleDomain = scaleMapping.map(x => x.from);
        scaleDomain.push(scaleMapping[scaleMapping.length - 1].to);

        const scaleRange = ['---', ...scaleMapping.map(x => x.class), '---'];

        const d3Scale = scaleThreshold<number, string>().domain(scaleDomain).range(scaleRange);

        return (val: number) => {
            return val && d3Scale(val);
        };
    }, [scaleMapping]);
}

export function useDataColor(variableSpec: VariableSpec) {
    const colorScaleFn = useColorScale(variableSpec);

    return useCallback((d: any) => colorScaleFn(d), [colorScaleFn]);
}

export function useDataClass(variableSpec: VariableSpec) {
    const textScaleFn = useTextScale(variableSpec);

    return useCallback((d: any) => textScaleFn(d), [textScaleFn]);
}

export function useFeatureDataColor(variableSpec: VariableSpec) {
    const fullKey = getVariableFullKey(variableSpec);
    const colorScaleFn = useColorScale(variableSpec);

    return useCallback(
        f => fullKey && colorScaleFn(f.properties[fullKey]),
        [colorScaleFn, fullKey],
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

export function useCompareData(variableSpec: VariableSpec) {
    const { invertOrderToAscending } = VARIABLES[variableSpec.dataset][variableSpec.variable];

    const getData = useFeatureDataValue(variableSpec);

    return useMemo(() => {
        if (invertOrderToAscending) {
            return (a, b) => getData(a) - getData(b);
        } else {
            return (a, b) => getData(b) - getData(a);
        }
    }, [invertOrderToAscending, getData]);
}
