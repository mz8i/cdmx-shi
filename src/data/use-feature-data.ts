import { useCallback } from 'react';
import { COLOR_SCALES } from '../config/color-scales';
import { VARIABLES, VariableSpec } from '../config/variables';

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
        [variableSpec, fullKey]
    );
}
