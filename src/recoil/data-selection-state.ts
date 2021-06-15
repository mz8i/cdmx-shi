import { atom, selector } from 'recoil';

import { DimensionSpec, VariableSpec } from '../config/variables';
import { BudgetName, GeoLevel, TimeName, VariableName, WeightingName } from '../config/variables';

export const coloniasVariableState = atom<VariableName>({
    key: 'coloniasVariable',
    default: 'CW_sqm',
});

export const alcaldiasVariableState = atom<VariableName>({
    key: 'alcaldiasVariable',
    default: 'CW_budget',
});

export const currentVariableState = selector<VariableName>({
    key: 'geoLevelVariable',
    get: ({ get }) =>
        get(geoLevelState) === 'colonias'
            ? get(coloniasVariableState)
            : get(alcaldiasVariableState),
    set: ({ get, set }, newVal) =>
        get(geoLevelState) === 'colonias'
            ? set(coloniasVariableState, newVal)
            : set(alcaldiasVariableState, newVal),
});

export const budgetDimensionState = atom<BudgetName>({
    key: 'budgetDimension',
    default: 'b2',
});

export const timeDimensionState = atom<TimeName>({
    key: 'timeDimension',
    default: 'c',
});

export const weightingDimensionState = atom<WeightingName>({
    key: 'weightingDimension',
    default: 'w1',
});

export const geoLevelState = atom<GeoLevel>({
    key: 'geoLevel',
    default: 'colonias',
});

export const dimensionsSpecState = selector<DimensionSpec>({
    key: 'dimensionsSpec',
    get: ({ get }) => ({
        time: get(timeDimensionState),
        budget: get(budgetDimensionState),
        weighting: get(weightingDimensionState),
    }),
});

export const variableSpecState = selector<VariableSpec>({
    key: 'variableSpec',
    get: ({ get }) => ({
        dataset: get(geoLevelState),
        variable: get(currentVariableState),
        dimensions: get(dimensionsSpecState),
    }),
});
